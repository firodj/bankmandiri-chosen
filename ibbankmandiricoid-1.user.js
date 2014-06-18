// ==UserScript==
// @id             ib.bankmandiri.co.id-9265338f-ffb3-468c-b50f-79de399c44cd@scriptish
// @name           BankMandiri Transfer Chosen
// @version        1.1
// @namespace      
// @author         firodj
// @description    
// @include        https://ib.bankmandiri.co.id/retail/FundTransfer.do?action=form
// @run-at         document-end
// ==/UserScript==

// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
    var script = document.createElement("script");
    script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js");
    script.addEventListener('load', function() {
        var script = document.createElement("script");
        script.textContent = "(" + callback.toString() + ")();";
        document.body.appendChild(script);
        }, false);
    document.body.appendChild(script);
    //script.setAttribute("src", "http://js-naturalsort.googlecode.com/svn/trunk/naturalSort.js");
}

// the guts of this userscript
function main() {
    /*
     * Natural Sort algorithm for Javascript - Version 0.7 - Released under MIT license
     * Author: Jim Palmer (based on chunking idea from Dave Koelle)
     */
    naturalSort=function (a, b) {
        var re = /(^-?[0-9]+(\.?[0-9]*)[df]?e?[0-9]?$|^0x[0-9a-f]+$|[0-9]+)/gi,
            sre = /(^[ ]*|[ ]*$)/g,
            dre = /(^([\w ]+,?[\w ]+)?[\w ]+,?[\w ]+\d+:\d+(:\d+)?[\w ]?|^\d{1,4}[\/\-]\d{1,4}[\/\-]\d{1,4}|^\w+, \w+ \d+, \d{4})/,
            hre = /^0x[0-9a-f]+$/i,
            ore = /^0/,
            i = function(s) { return naturalSort.insensitive && (''+s).toLowerCase() || ''+s },
            // convert all to strings strip whitespace
            x = i(a).replace(sre, '') || '',
            y = i(b).replace(sre, '') || '',
            // chunk/tokenize
            xN = x.replace(re, '\0$1\0').replace(/\0$/,'').replace(/^\0/,'').split('\0'),
            yN = y.replace(re, '\0$1\0').replace(/\0$/,'').replace(/^\0/,'').split('\0'),
            // numeric, hex or date detection
            xD = parseInt(x.match(hre)) || (xN.length != 1 && x.match(dre) && Date.parse(x)),
            yD = parseInt(y.match(hre)) || xD && y.match(dre) && Date.parse(y) || null,
            oFxNcL, oFyNcL;
        // first try and sort Hex codes or Dates
        if (yD)
            if ( xD < yD ) return -1;
            else if ( xD > yD ) return 1;
        // natural sorting through split numeric strings and default strings
        for(var cLoc=0, numS=Math.max(xN.length, yN.length); cLoc < numS; cLoc++) {
            // find floats not starting with '0', string or 0 if not defined (Clint Priest)
            oFxNcL = !(xN[cLoc] || '').match(ore) && parseFloat(xN[cLoc]) || xN[cLoc] || 0;
            oFyNcL = !(yN[cLoc] || '').match(ore) && parseFloat(yN[cLoc]) || yN[cLoc] || 0;
            // handle numeric vs string comparison - number < string - (Kyle Adams)
            if (isNaN(oFxNcL) !== isNaN(oFyNcL)) { return (isNaN(oFxNcL)) ? 1 : -1; }
            // rely on string comparison if different types - i.e. '02' < 2 != '02' < '2'
            else if (typeof oFxNcL !== typeof oFyNcL) {
                oFxNcL += '';
                oFyNcL += '';
            }
            if (oFxNcL < oFyNcL) return -1;
            if (oFxNcL > oFyNcL) return 1;
        }
        return 0;
    };
    naturalSort.insensitive = true;
    
    NASort = function(a, b) {    
        ta=a.innerHTML;
    	tb=b.innerHTML;
    	ta_s=ta.indexOf('-');
    	tb_s=tb.indexOf('-');
    	
        if (ta=='NA') return 1;   
        if (tb=='NA') return -1;
        
    	if (ta_s>=0) ta=ta.substring(ta_s+1);
    	else return 1;
    	if (tb_s>=0) tb=tb.substring(tb_s+1);
    	else return -1;
    	
        //return (ta > tb) ? 1 : -1;
        return naturalSort(ta,tb);
    };
    
    // uncomment ganti REKENINGDEFAULT sesuai kebutuhan
	// x=$('select[name="fromAccountID"] option:contains("REKENINGDEFAULT")').val();	
	// defaultnya adalah pilihan pertama:
	// "Dari rekening"
	x=$('select[name="fromAccountID"] option[value!=""]:first').val();
    if (x != undefined)
    	$('select[name="fromAccountID"]').val(x);
		
	// "Dari Daftar Transfer"
    $('input[name="paymentOption"]')[1].click();
    $('select[name="toAccountNoReg"] option').sort(NASort).appendTo('select[name="toAccountNoReg"]');
}

// load jQuery and execute the main function
addJQuery(main);

