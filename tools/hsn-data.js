/* ===========================================================================
   HSN / SAC quick-reference dataset — GST 2.0 rates (effective 22 Sep 2025)
   The 12% and 28% slabs were withdrawn; the structure is Nil / 5% / 18% / 40%,
   with special rates for precious metals and stones.

   INDICATIVE ONLY. Rates and classifications change by notification, and many
   depend on packaging, value thresholds or end use. Always confirm on the GST
   portal before invoicing: https://services.gst.gov.in/services/searchhsnsac

   To update: edit this array. `note` carries any condition on the rate.
   =========================================================================== */
window.HSN_DATA = [

  /* ---- Chapter 1-5: live animals, animal products ----------------------- */
  { code:"0401", kind:"goods", desc:"Fresh milk and pasteurised milk, UHT milk", rate:0, cat:"Food & agriculture" },
  { code:"0402", kind:"goods", desc:"Milk powder, condensed milk", rate:5, cat:"Food & agriculture" },
  { code:"0403", kind:"goods", desc:"Curd, lassi, buttermilk", rate:0, cat:"Food & agriculture", note:"Pre-packaged and labelled included" },
  { code:"0405", kind:"goods", desc:"Butter, ghee, dairy spreads", rate:5, cat:"Food & agriculture" },
  { code:"0406", kind:"goods", desc:"Paneer / chhena", rate:0, cat:"Food & agriculture", note:"Pre-packaged and labelled included" },
  { code:"0406", kind:"goods", desc:"Cheese (other than paneer)", rate:5, cat:"Food & agriculture" },
  { code:"0407", kind:"goods", desc:"Birds' eggs in shell, fresh", rate:0, cat:"Food & agriculture" },
  { code:"0409", kind:"goods", desc:"Natural honey", rate:5, cat:"Food & agriculture", note:"Nil if not pre-packaged and labelled" },

  /* ---- Chapter 7-12: vegetables, fruit, cereals -------------------------- */
  { code:"0701", kind:"goods", desc:"Potatoes, fresh or chilled", rate:0, cat:"Food & agriculture" },
  { code:"0702", kind:"goods", desc:"Tomatoes, fresh or chilled", rate:0, cat:"Food & agriculture" },
  { code:"0703", kind:"goods", desc:"Onions, garlic, leeks, fresh", rate:0, cat:"Food & agriculture" },
  { code:"0713", kind:"goods", desc:"Dried leguminous vegetables (pulses, dal)", rate:5, cat:"Food & agriculture", note:"Nil if not pre-packaged and labelled" },
  { code:"0801", kind:"goods", desc:"Coconuts, cashew nuts, brazil nuts", rate:5, cat:"Food & agriculture" },
  { code:"0804", kind:"goods", desc:"Dates, figs, mangoes, guavas, fresh", rate:0, cat:"Food & agriculture" },
  { code:"0901", kind:"goods", desc:"Coffee, roasted or not", rate:5, cat:"Food & agriculture" },
  { code:"0902", kind:"goods", desc:"Tea", rate:5, cat:"Food & agriculture" },
  { code:"0904", kind:"goods", desc:"Pepper, chilli, other spices of the genus Piper", rate:5, cat:"Food & agriculture" },
  { code:"0910", kind:"goods", desc:"Ginger, turmeric, other spices", rate:5, cat:"Food & agriculture" },
  { code:"1001", kind:"goods", desc:"Wheat and meslin", rate:5, cat:"Food & agriculture", note:"Nil if not pre-packaged and labelled" },
  { code:"1006", kind:"goods", desc:"Rice", rate:5, cat:"Food & agriculture", note:"Nil if not pre-packaged and labelled" },
  { code:"1101", kind:"goods", desc:"Wheat flour (atta), maida", rate:5, cat:"Food & agriculture", note:"Nil if not pre-packaged and labelled" },

  /* ---- Chapter 15-22: oils, prepared food, beverages -------------------- */
  { code:"1507", kind:"goods", desc:"Soya-bean oil", rate:5, cat:"Food & agriculture" },
  { code:"1511", kind:"goods", desc:"Palm oil", rate:5, cat:"Food & agriculture" },
  { code:"1512", kind:"goods", desc:"Sunflower, safflower, cotton-seed oil", rate:5, cat:"Food & agriculture" },
  { code:"1515", kind:"goods", desc:"Other fixed vegetable oils (groundnut, mustard)", rate:5, cat:"Food & agriculture" },
  { code:"1701", kind:"goods", desc:"Cane or beet sugar", rate:5, cat:"Food & agriculture" },
  { code:"1704", kind:"goods", desc:"Sugar confectionery, toffees", rate:5, cat:"Food & agriculture" },
  { code:"1806", kind:"goods", desc:"Chocolate and cocoa preparations", rate:5, cat:"Food & agriculture" },
  { code:"1905", kind:"goods", desc:"Roti, chapati, khakhra, plain paratha", rate:0, cat:"Food & agriculture" },
  { code:"1905", kind:"goods", desc:"Biscuits, rusks, cakes, pastries", rate:5, cat:"Food & agriculture" },
  { code:"2106", kind:"goods", desc:"Namkeen, bhujia, mixtures, savoury snacks", rate:5, cat:"Food & agriculture" },
  { code:"2106", kind:"goods", desc:"Pan masala", rate:40, cat:"Sin & luxury" },
  { code:"2201", kind:"goods", desc:"Drinking water, packaged (20 litre)", rate:5, cat:"Food & agriculture" },
  { code:"2202", kind:"goods", desc:"Aerated / carbonated drinks, caffeinated beverages", rate:40, cat:"Sin & luxury" },
  { code:"2202", kind:"goods", desc:"Fruit pulp or juice based drinks, plant-based milk", rate:5, cat:"Food & agriculture" },
  { code:"2402", kind:"goods", desc:"Cigarettes, cigars, cheroots", rate:40, cat:"Sin & luxury", note:"Plus applicable compensation cess" },
  { code:"2403", kind:"goods", desc:"Chewing tobacco, zarda, gutkha, smoking mixtures", rate:40, cat:"Sin & luxury" },

  /* ---- Chapter 25-31: minerals, chemicals, pharma ------------------------ */
  { code:"2501", kind:"goods", desc:"Common salt", rate:0, cat:"Food & agriculture" },
  { code:"2523", kind:"goods", desc:"Cement, clinker", rate:18, cat:"Construction" },
  { code:"3004", kind:"goods", desc:"Medicaments, formulations", rate:5, cat:"Health & pharma" },
  { code:"3004", kind:"goods", desc:"Specified life-saving drugs", rate:0, cat:"Health & pharma", note:"Only drugs listed in the Nil notification" },
  { code:"3005", kind:"goods", desc:"Bandages, dressings, medical wadding", rate:5, cat:"Health & pharma" },
  { code:"3105", kind:"goods", desc:"Fertilisers", rate:5, cat:"Food & agriculture" },
  { code:"3208", kind:"goods", desc:"Paints and varnishes", rate:18, cat:"Construction" },
  { code:"3215", kind:"goods", desc:"Printing ink, writing ink", rate:18, cat:"Stationery & print" },

  /* ---- Chapter 33-34: personal care -------------------------------------- */
  { code:"3304", kind:"goods", desc:"Beauty and make-up preparations, skincare", rate:18, cat:"Personal care" },
  { code:"3305", kind:"goods", desc:"Hair oil, shampoo", rate:5, cat:"Personal care" },
  { code:"3306", kind:"goods", desc:"Toothpaste, dental floss, toothpowder", rate:5, cat:"Personal care" },
  { code:"3307", kind:"goods", desc:"Shaving preparations, deodorants, perfumes", rate:18, cat:"Personal care" },
  { code:"3401", kind:"goods", desc:"Soap, bathing bars, organic surface-active products", rate:5, cat:"Personal care" },
  { code:"3402", kind:"goods", desc:"Detergents, washing preparations", rate:18, cat:"Personal care" },

  /* ---- Chapter 39-49: plastics, rubber, paper ---------------------------- */
  { code:"3917", kind:"goods", desc:"Plastic tubes, pipes and fittings", rate:18, cat:"Construction" },
  { code:"3923", kind:"goods", desc:"Plastic packing articles, containers", rate:18, cat:"Industrial & packaging" },
  { code:"3924", kind:"goods", desc:"Plastic tableware, kitchenware, household articles", rate:18, cat:"Household goods" },
  { code:"4011", kind:"goods", desc:"New pneumatic tyres of rubber", rate:18, cat:"Automotive" },
  { code:"4202", kind:"goods", desc:"Trunks, suitcases, handbags, wallets", rate:18, cat:"Household goods" },
  { code:"4802", kind:"goods", desc:"Uncoated paper for writing and printing", rate:18, cat:"Stationery & print" },
  { code:"4817", kind:"goods", desc:"Envelopes, letter cards, postcards", rate:5, cat:"Stationery & print" },
  { code:"4820", kind:"goods", desc:"Exercise books, notebooks, registers", rate:0, cat:"Stationery & print" },
  { code:"4901", kind:"goods", desc:"Printed books, brochures", rate:0, cat:"Stationery & print" },
  { code:"4902", kind:"goods", desc:"Newspapers, journals, periodicals", rate:0, cat:"Stationery & print" },

  /* ---- Chapter 61-64: textiles and footwear ------------------------------ */
  { code:"6109", kind:"goods", desc:"T-shirts, singlets, vests, knitted", rate:5, cat:"Apparel & footwear", note:"Sale value up to Rs 2,500 per piece" },
  { code:"6109", kind:"goods", desc:"T-shirts, singlets, vests, knitted", rate:18, cat:"Apparel & footwear", note:"Sale value above Rs 2,500 per piece" },
  { code:"6203", kind:"goods", desc:"Men's suits, jackets, trousers", rate:5, cat:"Apparel & footwear", note:"Sale value up to Rs 2,500 per piece" },
  { code:"6204", kind:"goods", desc:"Women's suits, dresses, skirts", rate:5, cat:"Apparel & footwear", note:"Sale value up to Rs 2,500 per piece" },
  { code:"6302", kind:"goods", desc:"Bed linen, table linen, towels", rate:5, cat:"Household goods", note:"Sale value up to Rs 2,500 per piece" },
  { code:"6403", kind:"goods", desc:"Footwear with leather uppers", rate:5, cat:"Apparel & footwear", note:"Sale value up to Rs 2,500 per pair" },
  { code:"6403", kind:"goods", desc:"Footwear with leather uppers", rate:18, cat:"Apparel & footwear", note:"Sale value above Rs 2,500 per pair" },

  /* ---- Chapter 68-72: stone, ceramics, metals ---------------------------- */
  { code:"6802", kind:"goods", desc:"Worked monumental or building stone, granite, marble", rate:18, cat:"Construction" },
  { code:"6907", kind:"goods", desc:"Ceramic tiles, flags and paving", rate:18, cat:"Construction" },
  { code:"7102", kind:"goods", desc:"Rough diamonds", rate:0.25, cat:"Precious metals & stones" },
  { code:"7102", kind:"goods", desc:"Cut and polished diamonds, synthetic stones", rate:1.5, cat:"Precious metals & stones" },
  { code:"7108", kind:"goods", desc:"Gold, unwrought or semi-manufactured", rate:3, cat:"Precious metals & stones" },
  { code:"7106", kind:"goods", desc:"Silver, unwrought or semi-manufactured", rate:3, cat:"Precious metals & stones" },
  { code:"7113", kind:"goods", desc:"Articles of jewellery of precious metal", rate:3, cat:"Precious metals & stones", note:"Making charges taxed at 5%" },
  { code:"7117", kind:"goods", desc:"Imitation jewellery", rate:18, cat:"Household goods" },
  { code:"7213", kind:"goods", desc:"Bars and rods of iron or non-alloy steel", rate:18, cat:"Construction" },
  { code:"7308", kind:"goods", desc:"Structures of iron or steel", rate:18, cat:"Construction" },
  { code:"7323", kind:"goods", desc:"Table, kitchen and household articles of iron or steel", rate:18, cat:"Household goods" },

  /* ---- Chapter 84-85: machinery and electronics -------------------------- */
  { code:"8413", kind:"goods", desc:"Pumps for liquids", rate:18, cat:"Industrial & packaging" },
  { code:"8415", kind:"goods", desc:"Air conditioning machines", rate:18, cat:"Electronics & appliances" },
  { code:"8418", kind:"goods", desc:"Refrigerators, freezers", rate:18, cat:"Electronics & appliances" },
  { code:"8421", kind:"goods", desc:"Water filters and purifiers", rate:18, cat:"Electronics & appliances" },
  { code:"8443", kind:"goods", desc:"Printers, copying machines", rate:18, cat:"Electronics & appliances" },
  { code:"8450", kind:"goods", desc:"Household washing machines", rate:18, cat:"Electronics & appliances" },
  { code:"8471", kind:"goods", desc:"Computers, laptops, data processing units", rate:18, cat:"Electronics & appliances" },
  { code:"8481", kind:"goods", desc:"Taps, cocks, valves", rate:18, cat:"Construction" },
  { code:"8504", kind:"goods", desc:"Transformers, static converters, inverters", rate:18, cat:"Electronics & appliances" },
  { code:"8507", kind:"goods", desc:"Electric accumulators, batteries", rate:18, cat:"Electronics & appliances" },
  { code:"8517", kind:"goods", desc:"Mobile phones, telephone sets", rate:18, cat:"Electronics & appliances" },
  { code:"8528", kind:"goods", desc:"Television sets, monitors, projectors", rate:18, cat:"Electronics & appliances" },
  { code:"8536", kind:"goods", desc:"Switches, plugs, sockets, electrical apparatus", rate:18, cat:"Electronics & appliances" },
  { code:"8539", kind:"goods", desc:"Electric lamps, LED bulbs", rate:18, cat:"Electronics & appliances" },
  { code:"8544", kind:"goods", desc:"Insulated wire and cable", rate:18, cat:"Electronics & appliances" },

  /* ---- Chapter 87-90: vehicles, instruments ------------------------------ */
  { code:"8701", kind:"goods", desc:"Tractors (other than road tractors)", rate:5, cat:"Automotive" },
  { code:"8703", kind:"goods", desc:"Small cars — petrol up to 1200cc or diesel up to 1500cc, length up to 4m", rate:18, cat:"Automotive" },
  { code:"8703", kind:"goods", desc:"Mid-size and large cars, SUVs above the small-car limits", rate:40, cat:"Automotive" },
  { code:"8711", kind:"goods", desc:"Motorcycles up to 350cc", rate:18, cat:"Automotive" },
  { code:"8711", kind:"goods", desc:"Motorcycles above 350cc", rate:40, cat:"Automotive" },
  { code:"8712", kind:"goods", desc:"Bicycles and other cycles, not motorised", rate:5, cat:"Automotive" },
  { code:"8714", kind:"goods", desc:"Parts and accessories of vehicles of 8711-8713", rate:18, cat:"Automotive" },
  { code:"8802", kind:"goods", desc:"Aircraft for personal use", rate:40, cat:"Sin & luxury" },
  { code:"8903", kind:"goods", desc:"Yachts and vessels for pleasure or sports", rate:40, cat:"Sin & luxury" },
  { code:"9004", kind:"goods", desc:"Spectacles, goggles, corrective eyewear", rate:5, cat:"Health & pharma" },
  { code:"9018", kind:"goods", desc:"Medical, surgical and dental instruments", rate:5, cat:"Health & pharma" },
  { code:"9021", kind:"goods", desc:"Orthopaedic appliances, hearing aids, implants", rate:5, cat:"Health & pharma" },
  { code:"9022", kind:"goods", desc:"X-ray and radiation apparatus", rate:5, cat:"Health & pharma" },

  /* ---- Chapter 94-96: furniture, toys, misc ------------------------------ */
  { code:"9403", kind:"goods", desc:"Furniture — wooden, metal, plastic", rate:18, cat:"Household goods" },
  { code:"9404", kind:"goods", desc:"Mattresses, quilts, pillows, bedding", rate:18, cat:"Household goods" },
  { code:"9503", kind:"goods", desc:"Toys — tricycles, dolls, puzzles", rate:5, cat:"Household goods" },
  { code:"9505", kind:"goods", desc:"Festive, carnival and entertainment articles", rate:5, cat:"Household goods" },
  { code:"9603", kind:"goods", desc:"Brooms, brushes, toothbrushes", rate:5, cat:"Household goods" },
  { code:"9608", kind:"goods", desc:"Ball-point pens, markers, fountain pens", rate:18, cat:"Stationery & print" },
  { code:"9609", kind:"goods", desc:"Pencils, crayons, chalks", rate:0, cat:"Stationery & print" },
  { code:"9619", kind:"goods", desc:"Sanitary towels, napkins, tampons", rate:0, cat:"Personal care" },

  /* ---- SAC: services ----------------------------------------------------- */
  { code:"9954", kind:"services", desc:"Construction services — works contracts", rate:18, cat:"Services", note:"Concessional rates apply to specified affordable housing" },
  { code:"9961", kind:"services", desc:"Services in wholesale trade", rate:18, cat:"Services" },
  { code:"9962", kind:"services", desc:"Services in retail trade", rate:18, cat:"Services" },
  { code:"9963", kind:"services", desc:"Restaurant services — standalone", rate:5, cat:"Services", note:"Without input tax credit" },
  { code:"9963", kind:"services", desc:"Hotel accommodation, unit value up to Rs 7,500 per day", rate:5, cat:"Services", note:"Without input tax credit" },
  { code:"9963", kind:"services", desc:"Hotel accommodation, unit value above Rs 7,500 per day", rate:18, cat:"Services" },
  { code:"9964", kind:"services", desc:"Passenger transport — rail AC, air economy", rate:5, cat:"Services" },
  { code:"9965", kind:"services", desc:"Goods transport agency (GTA)", rate:5, cat:"Services", note:"5% without ITC or 18% with ITC, at the GTA's option" },
  { code:"9966", kind:"services", desc:"Rental services of transport vehicles with operator", rate:18, cat:"Services" },
  { code:"9967", kind:"services", desc:"Supporting services in transport, cargo handling", rate:18, cat:"Services" },
  { code:"9971", kind:"services", desc:"Financial and related services, banking charges", rate:18, cat:"Services" },
  { code:"9971", kind:"services", desc:"Individual life and health insurance", rate:0, cat:"Services", note:"Exempted under GST 2.0" },
  { code:"9972", kind:"services", desc:"Real estate services — agents, brokerage", rate:18, cat:"Services" },
  { code:"9973", kind:"services", desc:"Leasing or rental services without operator", rate:18, cat:"Services" },
  { code:"9982", kind:"services", desc:"Legal and accounting services", rate:18, cat:"Services" },
  { code:"998222", kind:"services", desc:"Accounting, auditing and bookkeeping services", rate:18, cat:"Services" },
  { code:"998231", kind:"services", desc:"Corporate tax consulting and preparation services", rate:18, cat:"Services" },
  { code:"998232", kind:"services", desc:"Individual tax preparation and planning services", rate:18, cat:"Services" },
  { code:"9983", kind:"services", desc:"Other professional, technical and business services", rate:18, cat:"Services" },
  { code:"9984", kind:"services", desc:"Telecommunications, broadcasting, internet services", rate:18, cat:"Services" },
  { code:"9985", kind:"services", desc:"Support services — manpower, security, cleaning", rate:18, cat:"Services" },
  { code:"9987", kind:"services", desc:"Maintenance, repair and installation services", rate:18, cat:"Services" },
  { code:"9988", kind:"services", desc:"Job work services", rate:5, cat:"Services", note:"Rate varies by the goods worked on; many job-work categories are 5%" },
  { code:"9992", kind:"services", desc:"Education services by recognised institutions", rate:0, cat:"Services", note:"Exempt; coaching and other education services are 18%" },
  { code:"9993", kind:"services", desc:"Human health and clinical establishment services", rate:0, cat:"Services", note:"Exempt; cosmetic procedures are taxable" },
  { code:"9995", kind:"services", desc:"Services of membership organisations", rate:18, cat:"Services" },
  { code:"9996", kind:"services", desc:"Recreational, cultural and sporting services", rate:18, cat:"Services" },
  { code:"9996", kind:"services", desc:"Online money gaming, betting, casinos, lottery", rate:40, cat:"Sin & luxury" },
  { code:"9997", kind:"services", desc:"Other services — beauty, wellness, grooming", rate:5, cat:"Services", note:"Without input tax credit" }
];
