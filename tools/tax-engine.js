/* ===========================================================================
   Income tax engine — India, FY 2026-27 (AY 2027-28)
   Pure functions, no DOM. Exposed as window.TaxEngine (browser) and
   module.exports (node, for tests).

   RATES LIVE HERE. When the Finance Act changes, edit RATES below and
   nothing else.
   =========================================================================== */
(function (root) {
  "use strict";

  var RATES = {
    label: "FY 2026-27 (AY 2027-28)",

    cess: 0.04,                 // Health & Education Cess

    new: {
      slabs: [
        { upto:  400000, rate: 0.00 },
        { upto:  800000, rate: 0.05 },
        { upto: 1200000, rate: 0.10 },
        { upto: 1600000, rate: 0.15 },
        { upto: 2000000, rate: 0.20 },
        { upto: 2400000, rate: 0.25 },
        { upto: Infinity, rate: 0.30 }
      ],
      standardDeduction: 75000,
      rebate: { limit: 1200000, max: 60000 },
      surcharge: [
        { above:  5000000, rate: 0.10 },
        { above: 10000000, rate: 0.15 },
        { above: 20000000, rate: 0.25 }   // capped at 25% in the new regime
      ]
    },

    old: {
      // Basic exemption varies by age; slabs above the exemption are common.
      exemption: { below60: 250000, senior: 300000, superSenior: 500000 },
      bands: [
        { upto:  500000, rate: 0.05 },
        { upto: 1000000, rate: 0.20 },
        { upto: Infinity, rate: 0.30 }
      ],
      standardDeduction: 50000,
      rebate: { limit: 500000, max: 12500 },
      surcharge: [
        { above:  5000000, rate: 0.10 },
        { above: 10000000, rate: 0.15 },
        { above: 20000000, rate: 0.25 },
        { above: 50000000, rate: 0.37 }
      ]
    }
  };

  function round(n) { return Math.round(n); }

  /* ---- Slab tax ---------------------------------------------------------- */

  function slabTaxNew(income) {
    var tax = 0, lower = 0, i, s, upper;
    for (i = 0; i < RATES.new.slabs.length; i++) {
      s = RATES.new.slabs[i];
      upper = Math.min(income, s.upto);
      if (upper > lower) tax += (upper - lower) * s.rate;
      lower = s.upto;
      if (income <= s.upto) break;
    }
    return tax;
  }

  function slabTaxOld(income, exemption) {
    // Income below the age-based exemption is nil; bands apply above it.
    var tax = 0, lower = exemption, i, b, upper;
    for (i = 0; i < RATES.old.bands.length; i++) {
      b = RATES.old.bands[i];
      if (b.upto <= exemption) continue;      // band fully inside the exemption
      upper = Math.min(income, b.upto);
      if (upper > lower) tax += (upper - lower) * b.rate;
      lower = Math.max(lower, b.upto);
      if (income <= b.upto) break;
    }
    return tax;
  }

  /* ---- Surcharge with marginal relief ------------------------------------ */

  function surchargeRate(table, income) {
    var rate = 0, i;
    for (i = 0; i < table.length; i++) {
      if (income > table[i].above) rate = table[i].rate;
    }
    return rate;
  }

  // Marginal relief: tax + surcharge may not exceed the tax at the threshold
  // plus the whole of the income above that threshold.
  function applySurcharge(table, income, baseTax, slabTaxFn) {
    var rate = surchargeRate(table, income);
    if (rate === 0) return { surcharge: 0, rate: 0, relief: 0 };

    var surcharge = baseTax * rate;

    var threshold = 0, i;
    for (i = 0; i < table.length; i++) {
      if (income > table[i].above) threshold = table[i].above;
    }

    var taxAtThreshold = slabTaxFn(threshold);
    var prevRate = surchargeRate(table, threshold);
    var capped = taxAtThreshold * (1 + prevRate) + (income - threshold);
    var relief = 0;

    if (baseTax + surcharge > capped) {
      relief = (baseTax + surcharge) - capped;
      surcharge = Math.max(0, surcharge - relief);
    }
    return { surcharge: surcharge, rate: rate, relief: relief };
  }

  /* ---- Public API -------------------------------------------------------- */

  /**
   * @param {object} input
   *   regime      "new" | "old"
   *   grossIncome total income before standard deduction and chapter VI-A
   *   salaried    boolean — standard deduction applies only to salary/pension
   *   age         "below60" | "senior" | "superSenior"   (old regime only)
   *   deductions  total chapter VI-A etc. (old regime only)
   */
  function calculate(input) {
    var regime     = input.regime === "old" ? "old" : "new";
    var gross      = Math.max(0, Number(input.grossIncome) || 0);
    var salaried   = !!input.salaried;
    var cfg        = RATES[regime];

    var stdDeduction = salaried ? cfg.standardDeduction : 0;
    var otherDeductions = regime === "old"
      ? Math.max(0, Number(input.deductions) || 0)
      : 0;

    var taxable = Math.max(0, gross - stdDeduction - otherDeductions);

    var exemption = regime === "old"
      ? (RATES.old.exemption[input.age] || RATES.old.exemption.below60)
      : 0;

    var slabFn = regime === "new"
      ? slabTaxNew
      : function (x) { return slabTaxOld(x, exemption); };

    var baseTax = slabFn(taxable);

    /* Section 87A rebate, with marginal relief just above the limit
       (new regime only — the old regime has a cliff, not marginal relief). */
    var rebate = 0, rebateRelief = 0;
    if (taxable <= cfg.rebate.limit) {
      rebate = Math.min(baseTax, cfg.rebate.max);
    } else if (regime === "new") {
      var excess = taxable - cfg.rebate.limit;
      if (baseTax > excess) { rebateRelief = baseTax - excess; rebate = rebateRelief; }
    }

    var taxAfterRebate = Math.max(0, baseTax - rebate);

    var sc = applySurcharge(cfg.surcharge, taxable, taxAfterRebate, slabFn);
    var cess = (taxAfterRebate + sc.surcharge) * RATES.cess;
    var total = taxAfterRebate + sc.surcharge + cess;

    return {
      regime: regime,
      grossIncome: round(gross),
      standardDeduction: round(stdDeduction),
      otherDeductions: round(otherDeductions),
      taxableIncome: round(taxable),
      taxBeforeRebate: round(baseTax),
      rebate: round(rebate),
      rebateMarginalRelief: round(rebateRelief),
      taxAfterRebate: round(taxAfterRebate),
      surcharge: round(sc.surcharge),
      surchargeRate: sc.rate,
      surchargeMarginalRelief: round(sc.relief),
      cess: round(cess),
      totalTax: round(total),
      effectiveRate: gross > 0 ? (total / gross) * 100 : 0,
      takeHome: round(gross - total)
    };
  }

  function compare(input) {
    var n = calculate({ regime:"new", grossIncome:input.grossIncome, salaried:input.salaried });
    var o = calculate({ regime:"old", grossIncome:input.grossIncome, salaried:input.salaried,
                        age:input.age, deductions:input.deductions });
    return {
      new: n,
      old: o,
      better: n.totalTax <= o.totalTax ? "new" : "old",
      saving: Math.abs(n.totalTax - o.totalTax)
    };
  }

  var api = { RATES: RATES, calculate: calculate, compare: compare };

  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.TaxEngine = api;

})(typeof window !== "undefined" ? window : this);
