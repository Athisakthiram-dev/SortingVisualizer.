const n=30;
const array=[];
start();
function start(){
    for(let i=0;i<n;i++){
       array[i]=Math.random();
    }
    showBars();
}
let audioCtx = null;

function playNote(freq) {
    if (audioCtx === null) {
        audioCtx = new (
            AudioContext || webkitAudioContext || window.webkitAudioContext
        )();
    }

    const dur = 0.1; 
    const osc = audioCtx.createOscillator();
    const node = audioCtx.createGain();

    osc.frequency.value = freq;
    osc.type = 'sine';

    osc.connect(node);
    node.connect(audioCtx.destination);

    node.gain.value = 0.1; 
    node.gain.linearRampToValueAtTime(0, audioCtx.currentTime+dur);
    osc.start();
    osc.stop(audioCtx.currentTime + dur); 
}
function bubbleSort(){
     const copy=[...array];
     const moves=bubbleSortVis(copy);
     animate(moves);
}
function insertionSort(){
    const copy=[...array];
    const moves=insertionSortVis(copy);
    animate(moves);
}
function selectionSort(){
    const copy=[...array];
    const moves=selectionSortVis(copy);
    animate(moves);
}
function animate(moves){
    if(moves.length==0){
        showBars();
        return;
    }
   
    const move=moves.shift();
    const[i,j]=move.indices;
    if(move.type=="swap"){
    [array[i],array[j]]=[array[j],array[i]];
    }
    playNote(200+array[i]*500);
    playNote(200+array[j]*500);
    showBars(move);
    setTimeout(function(){
        animate(moves);
    },50)
}
function selectionSortVis(array){
  const moves=[];
  do{
    var swapped=false;
    for(let i=0;i<array.length;i++){
         let min=i;
         for(let j=i+1;j<array.length;j++){
            if(array[min]> array[j]){
                
                min=j;
            }
         }
         if(min!=i){
            swapped=true;
            moves.push({indices:[min,i],type:"swap"});
            [array[i],array[min]]=[array[min],array[i]];
         }

    }
  }while(swapped);
  return moves;
}
function insertionSortVis(array){
    const moves=[];
    do{
        var swapped=false;
        for(let i=0;i<array.length;i++){
            let j=i;
            while(i>0 && array[j-1]>=array[j]){
                moves.push({indices:[j-1,j],type:"swap"});
                swapped=true;
                [array[j-1],array[j]]=[array[j],array[j-1]];
                j--;
            }
        }
    }while(swapped);
    return moves;
}
function bubbleSortVis(array){
    const moves=[];
do{
    var swapped=false;
    for(let i=1;i<array.length;i++){
       // moves.push({indices:[i-1,i],type:"comp"});
        if(array[i-1]>array[i]){
            moves.push({indices:[i-1,i],type:"swap"});
            swapped=true;
            [array[i-1],array[i]]=[array[i],array[i-1]];
        }
    }
}while(swapped);
return moves;
}
function showBars(move){
     const container=document.getElementById("container");
     container.innerHTML="";
     for(let i=0;i<array.length;i++){
        const bar=document.createElement("div");
        bar.style.height=array[i]*100+"%";
        bar.classList.add("bar");
        if(move && move.indices.includes(i)){
            bar.style.backgroundColor=
            move.type=="swap"?"red":"blue";
        }
        container.appendChild(bar);
     }
}


