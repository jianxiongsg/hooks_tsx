function ajax(options){
    let defaults = {
        type:'GET',
        url:'',
        data:{},
        header:{
            'Content-Type':'application/x-www-form-urlencoded'
        },
        success:function(){},
        error:function(){}
    }
    Object.assign(defaults,options);
    let xhr;
    if(window.XMLHttpRequest){
        xhr = new XMLHttpRequest()
    }else{
        xhr = new ActiveXObject("Microsoft.XMLHTTP")
    }
    let params = defaults.url.indexOf("?") === -1 ? '?':"&";
    for(let key in options.data){
        params += key + '=' + defaults.data[key]+"&";
    }
    params = params.substr(0,params.length-1);
    if(defaults.type === 'GET'){
        defaults.url = defaults.url + params;
    }
    xhr.open(defaults.type,defaults.url);
    if(defaults.type === 'POST'){
        let contentType = defaults.header['Content-Type'];
        xhr.setRequestHeader('Content-Type',contentType);
        if(contentType === 'application/json'){
            xhr.send(JSON.stringify(defaults.data))
        }else{
            xhr.send(params)
        }
    }else{
        xhr.send();
    }

    xhr.onload = function(){
        let contentType = xhr.getResponseHeader('Content-Type');
        let responseText = xhr.responseText;
        if(contentType.includes("application/json")){
            responseText = JSON.parse(responseText)
        }
        console.log("aaaaaaaaaaaaaaaaaaaa")
        if(xhr.status == 200){
            
            defaults.success(responseText,xhr);
        }else{
            defaults.error(responseText,xhr);
        }
    }
    console.log(xhr)
    xhr.onerror = function(err){
        console.log("...........onerror",err)
        defaults.error(".....报错error");
    }
}

ajax({
    type:'GET',
    url:'http://localhost:3000/users/test',
    data:{
        username:"zhangsan",
        id:"12345"
    },
    header:{
        'Content-Type':'application/x-www-form-urlencoded'
    },
    success:function(data,xhr){
        console.log("成功",data)
    },
    error:function(data,xhr){
        console.log("error",data)
    }
})