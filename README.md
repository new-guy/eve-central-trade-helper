Hello!

This tool filters out erroneous results from the EVE-Central System and Region Price Comparison Tool.  Right now the tool is set up for some basic filtering, but you can modify a few settings to change which results are filtered out.  It currently uses overall profit and ROI as heuristics for figuring out which trades should be filtered out.


To use this tool:

1) Point your browser here: https://eve-central.com/tradetool/

2) Type in the two systems that you want to trade between (PUT THEM INTO THE SYSTEM AND REGION PRICE COMPARISON TOOL.  THE OTHER ONE IS BUTT)

3) Hit F12 in Chrome, or whatever you have to hit in your plebian browser to open up the developer console.

4) Copy and paste the code into the developer console, then hit enter to filter out the results


If you would like to filter out a specific set of items, add their names to the currently_traded_items array.


To customize the tool's settings, change one of the settings variables.  Those are the variables at the top of the file.  It's pretty straight forward.  You've got your min & max ROI, along with min & max profit.  Additionally, you can change the list of currently traded items to filter out items that you're already trading in.