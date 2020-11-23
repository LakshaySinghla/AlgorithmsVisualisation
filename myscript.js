var sleepTime = 200
var page={num:1}
function sleep(ms) {
    return new Promise(
      resolve => setTimeout(resolve, ms)
    );
}
var a = 1;
async function BFS(arr, n, m){
    var path = [], vis =[]
    arr.forEach(function(row,r){
        var temp = [], temp1=[]
        row.forEach(function(col,c){
            temp.push([-1,-1])
            temp1.push(-1)
        })
        path.push(temp)
        vis.push(temp1)
    })
    var q = [[-1,-1],[0,0]], ri,ci, showPath=false
    path[0][0] = [0,0]
    while(q.length!=0){
        ri = q[0][0]
        ci = q[0][1]
        console.log("position "+ri+" "+ci)
        q.shift()
        if(ri==-1 && ci==-1){
            if(q.length==0){
                break
            }
            q.push([-1,-1])
            continue
        }
        vis[ri][ci] = 1
        displayGrid(arr,n,m, ri,ci,vis, showPath)
        if(ri==n-1 && ci==m-1){
            showPath=true
            break
        }
        if(ri>0 && arr[ri-1][ci]==1 && path[ri-1][ci][0]==-1){
            q.push([ri-1, ci])
            path[ri-1][ci] = [ri,ci]
        }
        if(ci<m-1 && arr[ri][ci+1]==1 && path[ri][ci+1][0]==-1){
            q.push([ri, ci+1])
            path[ri][ci+1] = [ri,ci]
        }
        if(ri<n-1 && arr[ri+1][ci]==1 && path[ri+1][ci][0]==-1){
            q.push([ri+1, ci])
            path[ri+1][ci] = [ri,ci]
        }
        if(ci>0 && arr[ri][ci-1]==1 && path[ri][ci-1][0]==-1){
            q.push([ri, ci-1])
            path[ri][ci-1] = [ri,ci]
        }
        await sleep(sleepTime)
    }
    if(showPath){
        var finalPath=[]
        console.log("Finding Path")
        ri=n-1
        ci=m-1
        finalPath.push([ri,ci])
        while(true){
            if(ri==0 && ci==0){
                break
            }
            displayGrid(arr,n,m, -1,-1,vis, showPath,finalPath)
            await sleep(sleepTime)
            var temp_r=path[ri][ci][0], temp_c=path[ri][ci][1]
            ri=temp_r
            ci=temp_c
            finalPath.push([ri,ci])
        }
        console.log(finalPath)
        displayGrid(arr,n,m, -1,-1,vis, showPath,finalPath)
    }
    else{
        displayGrid(arr,n,m, ri,ci,vis, showPath)
    }
}

async function Heuristic(arr, n, m){
    var path = [], vis =[]
    arr.forEach(function(row,r){
        var temp = [], temp1=[]
        row.forEach(function(col,c){
            temp.push([-1,-1])
            temp1.push(-1)
        })
        path.push(temp)
        vis.push(temp1)
    })

    var ri,ci, showPath=false, q=[]
    q.push({pos:[0,0], score:m+n-2})
    path[0][0] = [0,0]
    while(q.length!=0){
        ri = q[0].pos[0]
        ci = q[0].pos[1]
        console.log(q)
        console.log("position "+ri+" "+ci)
        q.shift()
        if(vis[ri][ci]!=-1){
            continue
        }
        vis[ri][ci] = 1
        displayGrid(arr,n,m, ri,ci,vis, showPath)
        if(ri==n-1 && ci==m-1){
            showPath=true
            break
        }
        if(ri>0 && arr[ri-1][ci]==1 && path[ri-1][ci][0]==-1){
            // q.push([ri-1, ci])
            q.push({pos:[ri-1,ci], score:n+m-2-(ri-1+ci)})
            path[ri-1][ci] = [ri,ci]
        }
        if(ci<m-1 && arr[ri][ci+1]==1 && path[ri][ci+1][0]==-1){
            // q.push([ri, ci+1])
            q.push({pos:[ri,ci+1], score:n+m-2-(ri+ci+1)})
            path[ri][ci+1] = [ri,ci]
        }
        if(ri<n-1 && arr[ri+1][ci]==1 && path[ri+1][ci][0]==-1){
            // q.push([ri+1, ci])
            q.push({pos:[ri+1,ci], score:n+m-2-(ri+1+ci)})
            path[ri+1][ci] = [ri,ci]
        }
        if(ci>0 && arr[ri][ci-1]==1 && path[ri][ci-1][0]==-1){
            // q.push([ri, ci-1])
            q.push({pos:[ri,ci-1], score:n+m-2-(ri+ci-1)})
            path[ri][ci-1] = [ri,ci]
        }
        q.sort(function(a,b){return a.score - b.score})
        await sleep(sleepTime)
    }
    if(showPath){
        var finalPath=[]
        console.log("Finding Path")
        ri=n-1
        ci=m-1
        finalPath.push([ri,ci])
        while(true){
            if(ri==0 && ci==0){
                break
            }
            displayGrid(arr,n,m, -1,-1,vis, showPath,finalPath)
            await sleep(sleepTime)
            var temp_r=path[ri][ci][0], temp_c=path[ri][ci][1]
            ri=temp_r
            ci=temp_c
            finalPath.push([ri,ci])
        }
        console.log(finalPath)
        displayGrid(arr,n,m, -1,-1,vis, showPath,finalPath)
    }
    else{
        displayGrid(arr,n,m, ri,ci,vis, showPath)
    }
}

function displayGrid(arr,n,m, ri,ci,vis, showPath, finalPath=undefined){
    $("tr").each(function(r,row) {
        $(row).find('td').each(function(c,col){
            if(arr[r][c]==0){
                $(col).css("background-color","rgb(114, 67, 6)") //brown
            }
            else{
                // if(vis.find(pos => pos[0]==r && pos[1]==c) == undefined){
                if(vis[r][c]==-1){
                    $(col).css("background-color","rgb(120, 197, 20)") //green
                }
                else{
                    $(col).css("background-color","rgb(141, 141, 230)") //light purple
                }
                if(showPath && finalPath.find(pos => pos[0]==r && pos[1]==c)!=undefined){
                    $(col).css("background-color","rgb(233, 224, 98)") //yellow
                }
            }
            if(r==n-1 && c==m-1){
                $(col).css("background-color","rgb(233, 136, 98)") //orange-red
            }
            if(r==ri && c==ci){
                $(col).css("background-color","rgb(98, 98, 233)") //dark purple
            }
        })
    });
}

function createTable(n,m){
    var r,c;
    var tbody = $("tbody")
    var s=""
    for(r=0;r<n;r++){
        s+="<tr class='d-flex justify-content-center'>"
        for(c=0;c<m;c++){
            s+="<td class='myclass'></td>"
        }
        s+="</tr>"
    }
    $(tbody).html(s)
}

function togglePage(){
    if(page.num==1){
        page.num=2
        //TODO: 

        console.log(page.num)
    }
    else{
        page.num=1
        //TODO:
        console.log(page.num)
    }
}

$(document).ready(function(){
    var arr = [
        [1,0,0,0,1,1,1,1],
        [1,1,1,1,0,1,1,1],
        [0,0,1,0,1,1,1,1],
        [0,1,1,1,1,0,0,0],
        [0,1,1,1,1,1,1,1],
        [0,1,0,1,1,1,1,1],
        [0,1,1,1,1,1,1,1]
    ]
    var n = arr.length, m=arr[0].length
    var vis =[]
    arr.forEach(function(row,r){
        var temp = []
        row.forEach(function(col,c){
            temp.push(-1)
        })
        vis.push(temp)
    })
    createTable(n,m)
    displayGrid(arr,n,m,0,0,vis,false)
    document.getElementById("start-bfs").addEventListener("click", function(){BFS(arr,n,m)}, false);
    document.getElementById("start-heuristic").addEventListener("click", function(){Heuristic(arr,n,m)}, false);
    document.getElementById("draw").addEventListener("click", function(){togglePage()}, false);
    
})