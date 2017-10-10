function flipInit($elm){
    console.log('init skeletor guy.');
    $elm.click(function(){
        $(this).toggleClass('flipped');
    });
}

export default {
    flipInit,
};