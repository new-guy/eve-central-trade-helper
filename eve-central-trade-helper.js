//THANKS STACKOVERFLOW http://stackoverflow.com/questions/149055/how-can-i-format-numbers-as-money-in-javascript

Number.prototype.formatMoney = function(c, d, t){
var n = this, 
    c = isNaN(c = Math.abs(c)) ? 2 : c, 
    d = d == undefined ? "." : d, 
    t = t == undefined ? "," : t, 
    s = n < 0 ? "-" : "", 
    i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", 
    j = (j = i.length) > 3 ? j % 3 : 0;
   return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
 };

//THANKS STACKOVERFLOW

//Drag into the console of eve-central
//July 7th, 2014

var dodixie_from_jita_items = ["10MN Afterburner II", "200mm Railgun II", "220mm Medium \'Scout\' Autocannon I", "280mm Howitzer Artillery II", "425mm Railgun II", "Adaptive Invulnerability Field II", "Advanced Drone Interfacing", "Amarr Drone Specialization", "Armor Kinetic Hardener II", "Armored Warfare Link - Passive Defense II", "Armored Warfare Link - Rapid Repair I", "Augmented\' Hobgoblin", "Auto Targeting System II", "Basic Energized Adaptive Nano Membrane", "Bastion Module I", "Bomb Launcher I", "Caldari Drone Specialization", "Caldari Navy Vespa", "Caldari Navy Warden", "Capital Hybrid Turret", "Capital Shield Operation", "Centii A-Type Explosive Plating", "Centii A-Type Thermic Plating", "Centum C-Type Medium Remote Armor Repairer", "Copasetic\' Particle Field Acceleration", "Core C-Type Armor Kinetic Hardener", "Corelum C-Type Energized Kinetic Membrane", "Corpum C-Type Medium Nosferatu", "Damage Control II", "Dread Guristas Thermic Dissipation Field", "Dual 180mm AutoCannon II", "ECM - Spatial Destabilizer II", "Explosion Dampening Array", "F85 Peripheral Damage System I", "Federation Navy Energized Adaptive Nano Membrane", "Fleeting Propulsion Inhibitor I", "Heavy Assault Missile Specialization", "Ice Harvester Upgrade II", "Imperial Navy Curator", "Inherent Implants \'Lancer\' Medium Energy Turret ME-803", "Inherent Implants \'Noble\' Mechanic MC-803", "Interdiction Sphere Launcher I", "Large Anti-EM Pump I", "Large Beam Laser Specialization", "Large Core Defense Capacitor Safeguard I", "Large Drone Durability Enhancer I", "Large Hybrid Burst Aerator I", "Large Hybrid Collision Accelerator I", "Large Projectile Burst Aerator I", "Large Pulse Laser Specialization", "Large Shield Extender II", "Large Transverse Bulkhead I", "Large Warhead Flare Catalyst I", "Magnetic Field Stabilizer II", "Medium Anti-EM Screen Reinforcer I", "Medium Anti-EM Screen Reinforcer II", "Medium Anti-Kinetic Pump II", "Medium Anti-Thermal Screen Reinforcer II", "Medium Anti-Thermic Pump II", "Medium Auxiliary Nano Pump II", "Medium Auxiliary Thrusters II", "Medium Beam Laser Specialization", "Medium Core Defense Field Extender I", "Medium Core Defense Field Purger II", "Medium Core Defense Operational Solidifier I", "Medium Egress Port Maximizer I", "Medium Hull Repairer II", "Medium Hybrid Collision Accelerator I", "Medium Hydraulic Bay Thrusters I", "Medium Hydraulic Bay Thrusters II", "Medium Hyperspatial Velocity Optimizer II", "Medium Ionic Field Projector I", "Medium Processor Overclocking Unit II", "Medium Pulse Laser Specialization", "Medium Remote Shield Booster II", "Medium S95a Remote Shield Booster", "Medium Transverse Bulkhead I", "Medium Trimark Armor Pump I Blueprint", "Medium Trimark Armor Pump II", "Medium Warhead Flare Catalyst I", "Medium Warhead Flare Catalyst II", "Medium Warhead Rigor Catalyst I", "Mid-grade Crystal Alpha", "Mining Director", "Mining Foreman Link - Laser Optimization II", "Mining Foreman Link - Mining Laser Field Enhancement II", "Minmatar Fuel Block Blueprint", "Modal Electron Particle Accelerator I", "Navy Micro Auxiliary Power Core", "Omnidirectional Tracking Enhancer II", "Photon Scattering Array", "Pithum C-Type Kinetic Deflection Amplifier", "Poteque \'Prospector\' Astrometric Rangefinding AR-806", "Power Diagnostic System II", "Rifter Blueprint", "Shadow Serpentis Energized Adaptive Nano Membrane", "Siege Warfare Link - Shield Efficiency I", "Siege Warfare Link - Shield Harmonizing II", "Signal Distortion Amplifier II", "Skirmish Warfare Link - Evasive Maneuvers II", "Small Ancillary Armor Repairer", "Small Ancillary Current Router II", "Small Anti-EM Screen Reinforcer II", "Small Anti-Explosive Pump II", "Small Anti-Thermic Pump II", "Small Bay Loading Accelerator I", "Small Bay Loading Accelerator II", "Small Core Defense Field Extender II", "Small Gravity Capacitor Upgrade II", "Small Hybrid Burst Aerator II", "Small Polycarbon Engine Housing II", "Small Processor Overclocking Unit II", "Small Projectile Burst Aerator II", "Small Pulse Laser Specialization", "Small Rocket Fuel Cache Partition I", "Small Trimark Armor Pump II", "Small Warhead Calefaction Catalyst II", "\'Stalwart\' Particle Field Magnifier", "Tracking Enhancer II", "True Sansha Armor Kinetic Hardener", "True Sansha Energized Thermic Membrane", "Venture Blueprint", "Warhead Upgrades"];

var current_system_items = dodixie_from_jita_items; //The array of items that you want to be filtered out 'cause you're already trading in them.

var min_origin_qty = 30;
var min_destination_qty = 10;
var min_roi = 0.11; //11% roi minimum
var max_roi = 3.5; //350% roi maximum
var min_profit = 250000;  //Minimum Profit
var max_profit = 10000000; //Maximum Profit

$('i:contains(Qty)').each(function(index)
{
	var container_element = $(this).parent().parent();
	var item_name = container_element.find("a").text();

	var holder = $(this).parent().contents().filter(function()
	{
		return this.nodeType == Node.TEXT_NODE;
	}).text();  //Get the text that's not in an element

	var origin_qty = parseInt(holder.split('\n')[5].replace(/[^\d\.\-\ ]/g,'')); //0 blank, 1 price, 2 blank, 3 price, 4 blank, 5 qty, 6 blank
	var origin_buy = parseFloat(holder.split('\n')[1].replace(/[^\d\.\-\ ]/g,''));
	var origin_sell = parseFloat(holder.split('\n')[3].replace(/[^\d\.\-\ ]/g,''));
	
	if(origin_qty < min_origin_qty)
	{
		container_element.attr('hiding', 'true');
		container_element.hide();
	}

	var adjacent_td = $(this).parent().next();
	var adjacent_holder = adjacent_td.contents().filter(function()
	{
		return this.nodeType == Node.TEXT_NODE;
	}).text();

	var destination_qty = parseInt(adjacent_holder.split('\n')[4].replace(/[^\d\.\-\ ]/g,'')); //0 blank, 1 price, 2 price, 3 blank, 4 qty
	var destination_buy = parseFloat(adjacent_holder.split('\n')[1].replace(/[^\d\.\-\ ]/g,''));
	var destination_sell = parseFloat(adjacent_holder.split('\n')[2].replace(/[^\d\.\-\ ]/g,''));

	var price_difference = Math.round((destination_sell - origin_sell)*100)/100;
	var roi = Math.round((price_difference/origin_sell)*100)/100;

	container_element.append("<td>Item Name: " + item_name + "<br>Profit: " + price_difference.formatMoney(2, '.', ',') + "<br>ROI: " + roi + "</td>");

	var QUANTITY_OUT_OF_BOUNDS = (destination_qty < min_destination_qty && origin_qty >= min_origin_qty);
	var ROI_OUT_OF_BOUNDS = (roi < min_roi || roi > max_roi);
	var PROFIT_OUT_OF_BOUNDS = (price_difference < min_profit || price_difference > max_profit);
	var ITEM_ALREADY_IN_USE = ($.inArray(item_name, current_system_items) > -1);

	if(ITEM_ALREADY_IN_USE) console.log("Item In Use: " + item_name);

	if(QUANTITY_OUT_OF_BOUNDS || ROI_OUT_OF_BOUNDS || PROFIT_OUT_OF_BOUNDS || ITEM_ALREADY_IN_USE)
	{
		container_element.attr('hiding', 'true');
		container_element.hide();
	}
});