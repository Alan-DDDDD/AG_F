//var url = "https://exact-united-guinea.ngrok-free.app";
//var url = "https://fresh-concrete-flounder.ngrok-free.app";
var url = "https://patient-kangaroo-newly.ngrok-free.app";
//var url = "https://localhost:5001";
var datalist;
var ddllist;
var curruntuser;
var curruntid;
var curruntlevel;
var ddlp;
var data;
var msg;
var caseid;
var liffId = "2003018925-03bR6Jo3";
var pfdid;
var h = new Headers({
  "ngrok-skip-browser-warning": "69420",
  //"authorization":""
});
var hcj = new Headers({
  "ngrok-skip-browser-warning": "69420",
  "Content-Type":"application/json",
  //"authorization":""
});


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

function d(d){
  if(d.Status){
    data = d.Data;
    return true;
  }else{
    msg = d.Msg;
    return false;
  }
}
async function getA(c,a,p){
  let u = url + "/api/" + c + "/" + a;
  if(p){
    u = u + "?" + p;
  }
  var r = await fetch(u,{
    method :"GET",
    headers : h
  });
  var d = await r.json();
  if(d.Status){
    datalist = d.Data;
    return true;
  }else{
    msg = d.Msg;
    return false;
  }
}

async function getD(c,a,p,b,l){
  let u = url + "/api/" + c + "/" + a;
  if(p){
    u = u + "?" + p;
  }
  var r = await fetch(u,{
    method :"GET",
    headers : h
  });
  var d = await r.json();
  if(d.Status){
    data = d.Data;
    if(b){
      cdl(l);
    }
    return true;
  }else{
    msg = d.Msg;
    return false;
  }
}

async function postD(c,a,p,b,l){
  let u = url + "/api/" + c + "/" + a;
  var r = await fetch(u,{
    method : "Post",
    headers : hcj,
    body : JSON.stringify(p)
  });
  var d = await r.json();
  if(d.Status){
    data = d.Data;
    if(b){
      cdl(l);
    }
    return true;
  }else{
    msg = d.Msg;
    return false;
  }
}

async function postFD(c,a,f,l){
  let u = url + "/api/" + c + "/" + a;
  var r = await fetch(u,{
    method : "Post",
    headers : new Headers({
      "ngrok-skip-browser-warning": "69420",
      "authorization": pfdid,
      "type":"E"
    }),
    body : f
  });
  var d = await r.json();
  if(d.Status){
    data = d.Data;
    cdl(l);
    return true;
  }else{
    msg = d.Msg;
    return false;
  }
}
async function pgD(c,a,p,g,b,l){
  let u = url + "/api/" + c + "/" + a ;
  if(g){
    u = u + "?" + g;
  }
  var r = await fetch(u,{
    method : "Post",
    headers : hcj,
    body : JSON.stringify(p)
  });
  var d = await r.json();
  if(d.Status){
    data = d.Data;
    if(b){
      cdl(l);
    }
    return true;
  }else{
    msg = d.Msg;
    return false;
  }
}

//修改datalist
function cdl(p){
  let c = true;
  $.each(datalist,(i,d)=>{
    switch (p){
      case 'fare':
        if(d.fare.Id == data.fare.Id){
          datalist[i] = data;
          c = false;
        }
        break;
      case 'cust':
        if(d.cust.Custid == data.cust.Custid){
          datalist[i] = data;
          c = false;
        }
        break;
      case 'order':
        if(d.caseorder.Csid == data.caseorder.Csid){
          datalist[i] = data;
          c = false;
        }
        break;
      default:
        if(d.Pdid == data.Pdid){
          datalist[i] = data;
          c = false;
        }
        break;
    }
  });
  if(c){
    datalist.push(data);
  }
}

async function getddl(p){
  let u = url + "/api/Code/GetDDL";
    h.set("Content-Type","application/json");
  var r = await fetch(u,{
    method:"POST",
    headers:hcj,
    body : JSON.stringify(p)
  });
  var d = await r.json();
  if(d.Status){
    ddllist = d.Data;
    return true;
  }else{
    msg = d.Msg;
    return false;
  }
}

function bindDDL(p){
  $.each(p,(i,d)=>{
    let ddl = ddllist[d];
    let o = $(`.ddl`+d);
    o.empty();
    o.append(`<option value="">請選擇</option>`);
    $.each(ddl,(j,k)=>{
      o.append(`<option value="${k.Dataid}">${k.Data}</option>`)
    });
  });
};

async function Login(p){
  var r = await fetch(url+"/api/Login/login",{
    method : "POST",
    headers : hcj,
    body : JSON.stringify(p)
  })
  var d = await r.json();
  if(d.Status){
    return true;
  }else{
    msg = d.Msg;
    return false;
  }

}