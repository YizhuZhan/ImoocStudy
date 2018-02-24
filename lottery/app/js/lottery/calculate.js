class Calculate{
    /**
     * [computeCount 计算注数]
     * @param active    [当前选中的号码]
     * @param playname  [当前的玩法标识]
     * @return number   [注数]
     */
    computeCount(active, playname){

    }




    static combine(arr,size){
        let allResult=[];
        (function f(arr,size,result){
            let arrLen=arr.length;// 底数 n
            if(size>arrLen){
                return;
            }
            if(size===arrLen){
                allResult.push([].concat(result,arr));
            }else{
                for(let i=0;i<arrLen;i++){
                    let newResult=[].concat(result);
                    newResult.push(arr[i]);
                    // console.log('newResult',newResult);
                    if(size===1){
                        allResult.push(newResult);
                    }else{
                        let newArr=[].concat(arr);
                        newArr.splice(0,i+1);
                        // console.log('newArr',newArr);
                        f(newArr,size-1,newResult);
                    }
                }
            }

        })(arr,size,[])
        return allResult
    }
}

// console.log(Calculate.combine([1,2,3,4], 2));

