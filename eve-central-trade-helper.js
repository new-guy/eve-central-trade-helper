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

var currently_traded_items = []; //The array of items that you want to be filtered out 'cause you're already trading in them.
//Just put item names in the array, like ["Large Projectile Burst Aerator", "Purifier", "Caldari Navy Antimatter Charge S"]

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
	var ITEM_ALREADY_IN_USE = ($.inArray(item_name, currently_traded_items) > -1);

	if(ITEM_ALREADY_IN_USE) console.log("Item In Use: " + item_name);

	if(QUANTITY_OUT_OF_BOUNDS || ROI_OUT_OF_BOUNDS || PROFIT_OUT_OF_BOUNDS || ITEM_ALREADY_IN_USE)
	{
		container_element.attr('hiding', 'true');
		container_element.hide();
	}
});