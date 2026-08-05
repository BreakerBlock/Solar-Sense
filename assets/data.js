/* ═══════════════════════════════════════════════════════════════
   SolarSense India — shared data
   Edit this ONE file to update tariffs, zones, or panel specs.
   Every page reads from here.
═══════════════════════════════════════════════════════════════ */

const TARIFFS = {
  "Andhra Pradesh":{d:4.5,b:2.50,dis:"APEPDCL / APSPDCL",slug:"andhra-pradesh"},
  "Assam":{d:5.2,b:2.80,dis:"APDCL",slug:"assam"},
  "Bihar":{d:6.1,b:3.00,dis:"NBPDCL / SBPDCL",slug:"bihar"},
  "Chhattisgarh":{d:4.8,b:2.60,dis:"CSPDCL",slug:"chhattisgarh"},
  "Delhi":{d:7.0,b:3.50,dis:"BSES / Tata Power Delhi",slug:"delhi"},
  "Goa":{d:3.9,b:2.20,dis:"Goa Electricity Dept.",slug:"goa"},
  "Gujarat":{d:5.5,b:2.25,dis:"DGVCL / MGVCL / PGVCL",slug:"gujarat"},
  "Haryana":{d:7.2,b:2.00,dis:"DHBVN / UHBVN",slug:"haryana"},
  "Himachal Pradesh":{d:4.1,b:2.50,dis:"HPSEBL",slug:"himachal-pradesh"},
  "Jharkhand":{d:5.5,b:2.80,dis:"JBVNL",slug:"jharkhand"},
  "Karnataka":{d:6.2,b:3.35,dis:"BESCOM / HESCOM",slug:"karnataka"},
  "Kerala":{d:5.8,b:3.00,dis:"KSEB",slug:"kerala"},
  "Madhya Pradesh":{d:5.1,b:2.65,dis:"MPEZ / MPMKVVCL",slug:"madhya-pradesh"},
  "Maharashtra":{d:6.5,b:3.06,dis:"MSEDCL / Adani / Tata",slug:"maharashtra"},
  "Odisha":{d:5.5,b:2.80,dis:"TPCODL / TPNODL",slug:"odisha"},
  "Punjab":{d:7.0,b:2.50,dis:"PSPCL",slug:"punjab"},
  "Rajasthan":{d:6.5,b:2.85,dis:"AVVNL / JDVVNL / JVVNL",slug:"rajasthan"},
  "Tamil Nadu":{d:5.0,b:2.25,dis:"TANGEDCO",slug:"tamil-nadu"},
  "Telangana":{d:5.3,b:2.50,dis:"TSNPDCL / TSSPDCL",slug:"telangana"},
  "Uttar Pradesh":{d:6.5,b:2.50,dis:"PVVNL / DVVNL / MVVNL",slug:"uttar-pradesh"},
  "Uttarakhand":{d:5.4,b:2.60,dis:"UPCL",slug:"uttarakhand"},
  "West Bengal":{d:7.5,b:2.75,dis:"WBSEDCL / CESC",slug:"west-bengal"},
};

const ZONES = {
  rajasthan:{n:"Very High Solar Zone",e:"🔆",h:6.5,desc:"India's highest irradiance — best ROI in the country.",m:[85,80,90,95,100,95,75,72,80,90,88,82]},
  jaipur:{n:"Very High Solar Zone",e:"🔆",h:6.4,desc:"Jaipur sits in Rajasthan's prime solar belt.",m:[84,80,90,96,100,94,76,73,80,90,88,82]},
  gujarat:{n:"High Solar Zone",e:"☀️",h:5.8,desc:"Consistent sunshine year-round.",m:[80,78,85,90,88,80,68,65,75,85,82,78]},
  ahmedabad:{n:"High Solar Zone",e:"☀️",h:5.8,desc:"Central Gujarat gets strong year-round sunshine.",m:[80,78,85,90,88,80,70,67,76,86,82,78]},
  delhi:{n:"Good Solar Zone",e:"☀️",h:5.5,desc:"Good irradiance with winter haze. Summers peak.",m:[65,72,82,88,90,82,70,72,80,82,72,60]},
  gurugram:{n:"Good Solar Zone",e:"☀️",h:5.5,desc:"Delhi-NCR with the highest domestic tariff in India.",m:[65,72,82,88,90,82,70,72,80,82,72,60]},
  gurgaon:{n:"Good Solar Zone",e:"☀️",h:5.5,desc:"Delhi-NCR with high tariffs — strong payback.",m:[65,72,82,88,90,82,70,72,80,82,72,60]},
  noida:{n:"Good Solar Zone",e:"☀️",h:5.5,desc:"NCR region — same irradiance as Delhi.",m:[65,72,82,88,90,82,70,72,80,82,72,60]},
  haryana:{n:"Good Solar Zone",e:"☀️",h:5.5,desc:"Highest domestic tariff in India — excellent payback.",m:[65,72,82,88,90,82,70,72,80,82,72,60]},
  punjab:{n:"Good Solar Zone",e:"☀️",h:5.2,desc:"Good sunshine with strong state incentives.",m:[60,68,78,88,90,82,72,74,80,82,72,58]},
  maharashtra:{n:"High Solar Zone",e:"☀️",h:5.5,desc:"Vidarbha and Marathwada are exceptional.",m:[88,85,90,88,82,60,55,55,65,85,88,86]},
  mumbai:{n:"High Solar Zone",e:"☀️",h:5.2,desc:"Good solar but monsoon months dip significantly.",m:[85,82,88,86,80,55,50,52,60,82,86,84]},
  pune:{n:"High Solar Zone",e:"☀️",h:5.5,desc:"Among the best irradiance in Maharashtra.",m:[88,86,90,88,84,65,60,62,70,86,88,86]},
  karnataka:{n:"High Solar Zone",e:"☀️",h:5.3,desc:"Bangalore and interior Karnataka excel.",m:[85,82,85,80,75,60,58,60,65,80,82,84]},
  bangalore:{n:"High Solar Zone",e:"☀️",h:5.3,desc:"One of India's best zones, high buyback rate.",m:[85,82,85,80,75,60,58,60,65,80,82,84]},
  bengaluru:{n:"High Solar Zone",e:"☀️",h:5.3,desc:"One of India's best zones, high buyback rate.",m:[85,82,85,80,75,60,58,60,65,80,82,84]},
  hyderabad:{n:"High Solar Zone",e:"☀️",h:5.4,desc:"Excellent irradiance year-round.",m:[86,84,88,88,84,74,70,72,76,82,84,84]},
  telangana:{n:"High Solar Zone",e:"☀️",h:5.4,desc:"Strong sunshine especially in summer.",m:[86,84,88,88,84,74,70,72,76,82,84,84]},
  tamil:{n:"Moderate-High Zone",e:"⛅",h:5.0,desc:"Strong solar but monsoon (Oct–Dec) reduces output.",m:[80,82,85,85,82,72,70,72,68,55,50,65]},
  chennai:{n:"Moderate-High Zone",e:"⛅",h:4.9,desc:"Two monsoon seasons reduce annual hours.",m:[78,80,84,83,80,70,68,70,65,52,48,62]},
  kerala:{n:"Moderate Solar Zone",e:"⛅",h:4.5,desc:"Two monsoons. Battery backup recommended.",m:[75,78,80,70,60,45,42,45,55,60,65,70]},
  "west bengal":{n:"Moderate Solar Zone",e:"⛅",h:4.5,desc:"Moderate irradiance, significant monsoon losses.",m:[70,72,78,82,80,65,60,62,68,75,72,68]},
  kolkata:{n:"Moderate Solar Zone",e:"⛅",h:4.5,desc:"Monsoon significantly reduces output.",m:[68,70,76,80,78,62,58,60,66,73,70,65]},
  "uttar pradesh":{n:"Good Solar Zone",e:"☀️",h:5.3,desc:"Good irradiance, large rooftop market.",m:[70,75,84,90,90,82,72,74,80,84,76,65]},
  lucknow:{n:"Good Solar Zone",e:"☀️",h:5.3,desc:"Central UP sees good solar potential.",m:[70,75,84,90,90,82,72,74,80,84,76,65]},
  default:{n:"Average Solar Zone",e:"🌤️",h:5.0,desc:"India averages 4.5–5.5 peak sun hours.",m:[75,76,82,86,85,72,65,66,72,80,78,74]},
};

const PANELS = {
  poly:{n:"Polycrystalline",eff:16,cost:1.0,warranty:25,degr:0.7,wpp:330,desc:"Blue-tinted budget option. Lowest cost per watt but needs the most space.",pros:"Cheapest upfront",cons:"Largest area, lower heat tolerance"},
  mono:{n:"Mono PERC",eff:19.5,cost:1.08,warranty:25,degr:0.55,wpp:400,desc:"Black cells, current industry standard. Best balance of cost and efficiency.",pros:"Best value, widely available",cons:"Slightly costlier than poly"},
  topcon:{n:"TOPCon N-Type",eff:22,cost:1.22,warranty:30,degr:0.4,wpp:550,desc:"Newer N-type cells. Better low-light and high-temp performance, slower degradation.",pros:"30-yr warranty, low degradation",cons:"~20% costlier than mono"},
  bifacial:{n:"Bifacial HJT",eff:23,cost:1.38,warranty:30,degr:0.35,wpp:590,desc:"Generates from both faces. Needs elevated mounting or reflective ground to benefit.",pros:"Up to +12% yield on ground mount",cons:"Highest cost, needs clearance"},
};

const BATTS = {
  leadacid:{n:"Lead-acid tubular",cost:12000,life:5,dod:0.5},
  lifepo4:{n:"Lithium LFP",cost:28000,life:12,dod:0.85},
  lithium_prem:{n:"Lithium premium",cost:38000,life:15,dod:0.9},
};

// Last verified date shown on tariff pages
const DATA_UPDATED = "January 2026";

if (typeof module !== 'undefined') module.exports = { TARIFFS, ZONES, PANELS, BATTS, DATA_UPDATED };
