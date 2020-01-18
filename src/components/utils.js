function wordEnd(num, type) {
    if(type == undefined) {
        type = 'kv';
    }
    var letters = {
        'kv': ['а','ы',''],
        'pr': ['','a','ов'],
        'f': ['a','a','ей']
    }
    var free_1=(''+num).slice(-1);
    var free_2=(''+num).slice(-2,-1);
    if(free_1=='1' && free_2!='1') {
        return letters[type][0];
    } else
    if((free_1=='2' || free_1=='3' || free_1=='4') && free_2!='1') {
        return letters[type][1];
    } else {
        return letters[type][2];
    }
}

function getURLParameter(name, searchLine){
    if (typeof window === "undefined") return;
    const search = searchLine || window.location.search || window.location.hash;
    const uri = (new RegExp('(\\?|&)' + name + '=' + '(.+?)(&|$)').exec(search)||["",null])[2];
    return uri && decodeURI(uri);
}

// Event.composedPath polyfill
if (typeof window !== "undefined") {
    (function(e, d, w) {
      if(!e.composedPath) {
        e.composedPath = function() {
          if (this.path) {
            return this.path;
          } 
        const target = this.target;

        this.path = [];
        while (target.parentNode !== null) {
          this.path.push(target);
          target = target.parentNode;
        }
        this.path.push(d, w);
        return this.path;
        }
      }
    })(Event.prototype, document, window);
}

export { wordEnd, getURLParameter }