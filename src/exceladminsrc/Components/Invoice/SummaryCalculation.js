
import { execGql,pCLNT,pLANG } from '../apolloClient/apolloClient';
import {SearchTaxRatesQuery} from '../Queries/queries'
// .................Calulation Part..........................
export async function doCalulations(lineItemList, CLNT, LANG) {
    try {
        let TaxDetailsList = await execGql('query', SearchTaxRatesQuery, setTaxDetailsParams());
        console.log('TaxDetailsList.data.searchTaxRates');
        console.log(TaxDetailsList.data.searchTaxRates);
        console.log(lineItemList);
        console.log('TaxDetailsList.data.searchTaxRates end end');

        let lineItemTaxAmount = await doLineItemTaxCaculation(TaxDetailsList.data.searchTaxRates, lineItemList);


        console.log('lineItemTaxAmount -s');
        console.log(lineItemTaxAmount);
        console.log('lineItemTaxAmount -e');


        // console.log(lineItemTaxAmount);
        return await doSummaryCaculation(TaxDetailsList.data.searchTaxRates, lineItemTaxAmount, lineItemList, CLNT, LANG);
    } catch (error) {
        console.log(error);
        console.log(error.errorsGql);
        console.log(error.errorMessageGql);
    }

}
function setTaxDetailsParams() {
    var parameters = {
        CLNT: "1002",
        LANG: "EN",
        DOCTYPE: "INV"
    }
    return parameters

};

function doLineItemTaxCaculation(TaxDetailsList, lineItemList) {
    var lineItemTaxAmount = [];
    for (var i = 0; i < lineItemList.length; i++) {
        var selectedTax = lineItemList[i].TAX;
        if (!selectedTax == "") {
            var taxArr = selectedTax.split(",");
            for (var j = 0; j < taxArr.length; j++) {
                var taxCode = taxArr[j].trim();
                var taxDetails = (TaxDetailsList.filter(function (v, n) { return v.TAXCD == taxCode; }))[0];
                var taxRate = parseFloat(taxDetails.RATE);
                var lineItemPrice = parseFloat(lineItemList[i].AMOUNT);
                var taxamount = ((lineItemPrice * taxRate) / 100);
                if (lineItemList[i].SIGN == "-") {
                    taxamount = "-" + taxamount;
                }
                var GEOGRAPHY = "";
                var DATE = "";
                lineItemTaxAmount.push({
                    "CLNT": "1002",
                    "LANG": "EN",
                    "DOCID": "",
                    "DOCTYPE": "",
                    "GEOGRAPHY": GEOGRAPHY,
                    "DATE": DATE,
                    "TAXTYPE": taxCode,
                    "LINEITEMNO": lineItemList[i].LINEITEMNO,
                    "AMOUNT": lineItemPrice,
                    "RATE": taxRate,
                    "CORDER": taxDetails.CORDER,
                    "TAXTEXT": taxCode,
                    "SIGN": lineItemList[i].SIGN,
                    "TAXAMOUNT": taxamount,
                })
            }
        }
    }
    return lineItemTaxAmount;
}

async function doSummaryCaculation(TaxDetailsList, lineItemTaxAmount, lineItemList, CLNT, LANG) {
    var summarylist = [];
    var docid = "";
    try {
        await getSubTotal(summarylist, docid, lineItemList, CLNT, LANG);
        await getTaxTotal(lineItemTaxAmount, TaxDetailsList, summarylist, docid, CLNT, LANG);
        await getTotal(summarylist, docid, CLNT, LANG);
        return summarylist
        //console.log(summarylist);
    } catch (error) {
        console.log(error);

    }
}

function getSubTotal(summarylist, docid, lineItemList, CLNT, LANG) {
    var STOTAL = 0.0;
    var SIGN = "";
    for (var i = 0; i < lineItemList.length; i++) {
        if (lineItemList[i].SIGN == "-") {
            STOTAL = (STOTAL - parseFloat(lineItemList[i].AMOUNT));
        } else {
            STOTAL = (STOTAL + parseFloat(lineItemList[i].AMOUNT));
        }
    }
    if (STOTAL < 0) {
        SIGN: "-"
    }
    else {
        SIGN: "+"
    }
    summarylist.push({
        "CLNT": CLNT,
        "LANG": LANG,
        "DOCID": docid,
        "DOCTYPE": "INV",
        "GEOGRAPHY": "",
        "DATE": "",
        "TAXTYPE": "STOTAL",
        "LINEITEMNO": "999",
        "AMOUNT":Number(STOTAL).toFixed(2),
        "RATE": "",
        "TAXAMOUNT":Number(STOTAL).toFixed(2),
        "TAXTEXT": "Sub Total",
        "CORDER": "0",
        "SIGN": SIGN
    })

}
function getTaxTotal(lineItemTaxAmount, TaxDetailsList, summarylist, docid, CLNT, LANG) {
    var SIGN = "";
    console.log('TaxDetailsList')
    console.log(TaxDetailsList);
    for (var i = 0; i < TaxDetailsList.length; i++) {
        var TAXCD = TaxDetailsList[i].TAXCD;
        var taxTotal = 0.0;
        var lineItemTax = (lineItemTaxAmount.filter(function (v, n) { return v.TAXTYPE == TAXCD; }));
        if (lineItemTax.length > 0) {
            for (var j = 0; j < lineItemTax.length; j++) {
                taxTotal = taxTotal + parseFloat(lineItemTax[j].TAXAMOUNT);
            }
            if (taxTotal < 0) {
                SIGN: "-"
            }
            else {
                SIGN: "+"
            }
            summarylist.push({
                "DOCID": docid,
                "CLNT": CLNT,
                "LANG": LANG,
                "DOCTYPE": "INV",
                "GEOGRAPHY": "",
                "DATE": "",
                "TAXTYPE": TAXCD,
                "LINEITEMNO": "",
                "AMOUNT": Number(taxTotal).toFixed(2),
                "RATE": TaxDetailsList[i].RATE,
                "TAXAMOUNT": Number(taxTotal).toFixed(2),
                "TAXTEXT": TaxDetailsList[i].TAXDESC,
                "CORDER": TaxDetailsList[i].CORDER,
                "SIGN": SIGN
            })
        }
    }
}
function getTotal(summarylist, docid, CLNT, LANG) {
    var totalAmount = 0.0;
    for (var i = 0; i < summarylist.length; i++) {
        totalAmount = totalAmount + parseFloat(summarylist[i].TAXAMOUNT)
    }
    summarylist.push({
        "DOCID": docid,
        "CLNT": CLNT,
        "LANG": LANG,
        "DOCTYPE": "INV",
        "GEOGRAPHY": "",
        "DATE": "",
        "TAXTYPE": "TOTAL",
        "LINEITEMNO": "999",
        "AMOUNT": Number(totalAmount).toFixed(2),
        "RATE": "",
        "TAXAMOUNT":Number(totalAmount).toFixed(2),
        "TAXTEXT": "Total",
        "CORDER": "999",
        "SIGN": ""
    })
}