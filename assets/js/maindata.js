//var url = "https://88be-61-222-180-215.ngrok-free.app";
var url = "https://localhost:7109";
var fronturl = "https://alan-ddddd.github.io/JD/html";
var datalist;
var ddllist;
var curruntuser;
var curruntid;
var curruntlevel;
var msg;



Number.prototype.numberFormat = function(c, d, t){
  var n = this, 
      c = isNaN(c = Math.abs(c)) ? 2 : c, 
      d = d == undefined ? "." : d, 
      t = t == undefined ? "," : t, 
      s = n < 0 ? "-" : "", 
      i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))), 
      j = (j = i.length) > 3 ? j % 3 : 0;
     return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
};


async function getdata(c,a,p){
  let u = url + "/api/" + c + "/" + a;
  if(p){
    u = u + "?" + p;
  }
  var r = await fetch(u);
  var d = await r.json();
  if(d.Status){
    datalist = d.Data;
    return true;
  }else{
    msg = d.Msg;
    return false;
  }
}