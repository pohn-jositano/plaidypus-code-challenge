function jXHR ( Method, URL, Data ) {
  return new Promise(
    ( Success, Failure ) => {
      var Request = new XMLHttpRequest();
      Request.open( Method, URL );
      Request.onreadystatechange = function () { if ( Request.readyState == 4 ) { Success( JSON.parse( Request.responseText ) ); } };
      Request.onerror = Failure;
      Request.send( JSON.stringify( Data ) );
    }
  );
}

export { jXHR };