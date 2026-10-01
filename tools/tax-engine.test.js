const T = require('./tax-engine.js');
let pass = 0, fail = 0;
function eq(name, got, want, tol = 1) {
  const ok = Math.abs(got - want) <= tol;
  if (ok) { pass++; console.log('  ok   ' + name + '  = ' + got); }
  else { fail++; console.log('  FAIL ' + name + '  got ' + got + '  want ' + want); }
}

console.log('NEW REGIME');
// 12.75L salaried -> taxable 12.00L -> slab tax 60,000 -> rebate 60,000 -> nil
let r = T.calculate({ regime:'new', grossIncome:1275000, salaried:true });
eq('12.75L salaried taxable', r.taxableIncome, 1200000);
eq('12.75L salaried tax before rebate', r.taxBeforeRebate, 60000);
eq('12.75L salaried total tax', r.totalTax, 0);

// 12L non-salaried -> taxable 12L -> 60,000 -> rebate -> nil
r = T.calculate({ regime:'new', grossIncome:1200000, salaried:false });
eq('12L non-salaried total tax', r.totalTax, 0);

// 16L salaried -> taxable 15.25L
// 4-8L: 20,000 | 8-12L: 40,000 | 12-15.25L: 325000*15% = 48,750 => 108,750
r = T.calculate({ regime:'new', grossIncome:1600000, salaried:true });
eq('16L salaried taxable', r.taxableIncome, 1525000);
eq('16L salaried tax before cess', r.taxAfterRebate, 108750);
eq('16L salaried total tax', r.totalTax, Math.round(108750 * 1.04));

// 25L non-salaried: 20k+40k+60k+80k+100k + 1L*30% = 300000+30000 = 330000
// 4-8:20000, 8-12:40000, 12-16:60000, 16-20:80000, 20-24:100000, 24-25:30000
r = T.calculate({ regime:'new', grossIncome:2500000, salaried:false });
eq('25L tax before cess', r.taxAfterRebate, 330000);

// Marginal relief just above 12L: taxable 12,10,000
// slab tax = 20000+40000+10000*15% = 61,500 ; excess = 10,000 -> tax capped at 10,000
r = T.calculate({ regime:'new', grossIncome:1210000, salaried:false });
eq('12.10L marginal relief tax before cess', r.taxAfterRebate, 10000);
eq('12.10L marginal relief total', r.totalTax, 10400);

console.log('OLD REGIME');
// taxable 10L, below60: 2.5-5L @5% = 12,500 ; 5-10L @20% = 100,000 => 112,500 + 4% cess
r = T.calculate({ regime:'old', grossIncome:1000000, salaried:false, age:'below60', deductions:0 });
eq('old 10L tax before cess', r.taxAfterRebate, 112500);
eq('old 10L total', r.totalTax, 117000);

// taxable 5L -> tax 12,500 -> rebate 12,500 -> nil
r = T.calculate({ regime:'old', grossIncome:500000, salaried:false, age:'below60' });
eq('old 5L total (rebate)', r.totalTax, 0);

// senior citizen exemption 3L: taxable 5L -> (5-3)*5% = 10,000 -> rebate -> nil
r = T.calculate({ regime:'old', grossIncome:500000, salaried:false, age:'senior' });
eq('old senior 5L tax before rebate', r.taxBeforeRebate, 10000);
eq('old senior 5L total', r.totalTax, 0);

// super senior exemption 5L: taxable 8L -> (8-5)*... band 5-10 @20% = 3L*20% = 60,000
r = T.calculate({ regime:'old', grossIncome:800000, salaried:false, age:'superSenior' });
eq('old super-senior 8L tax before rebate', r.taxBeforeRebate, 60000);

// salaried 12L with 1.5L 80C: taxable = 12L - 50k - 1.5L = 10L -> 112,500
r = T.calculate({ regime:'old', grossIncome:1200000, salaried:true, age:'below60', deductions:150000 });
eq('old 12L salaried w/80C taxable', r.taxableIncome, 1000000);
eq('old 12L salaried w/80C total', r.totalTax, 117000);

console.log('SURCHARGE');
// new regime, taxable 60L: slab tax = 330000 + 36L*30%? recompute:
// up to 24L = 300000 ; 24L-60L = 36L*30% = 1,080,000 => 1,380,000
// surcharge 10% = 138,000 ; cess 4% of 1,518,000 = 60,720 => 1,578,720
r = T.calculate({ regime:'new', grossIncome:6000000, salaried:false });
eq('new 60L tax before surcharge', r.taxAfterRebate, 1380000);
eq('new 60L surcharge', r.surcharge, 138000);
eq('new 60L total', r.totalTax, 1578720);

// Surcharge cap in new regime: 6Cr should be 25%, not 37%
r = T.calculate({ regime:'new', grossIncome:60000000, salaried:false });
eq('new 6Cr surcharge rate', r.surchargeRate * 100, 25);
r = T.calculate({ regime:'old', grossIncome:60000000, salaried:false, age:'below60' });
eq('old 6Cr surcharge rate', r.surchargeRate * 100, 37);

console.log('COMPARE');
let c = T.compare({ grossIncome:1500000, salaried:true, age:'below60', deductions:0 });
eq('compare picks new with no deductions', c.better === 'new' ? 1 : 0, 1);
c = T.compare({ grossIncome:1500000, salaried:true, age:'below60', deductions:400000 });
console.log('  15L with 4L deductions -> better:', c.better, 'new:', c.new.totalTax, 'old:', c.old.totalTax);

console.log('\nEDGE');
r = T.calculate({ regime:'new', grossIncome:0, salaried:true });
eq('zero income', r.totalTax, 0);
r = T.calculate({ regime:'new', grossIncome:400000, salaried:false });
eq('4L exactly', r.totalTax, 0);

console.log('\n' + pass + ' passed, ' + fail + ' failed');
process.exit(fail ? 1 : 0);
