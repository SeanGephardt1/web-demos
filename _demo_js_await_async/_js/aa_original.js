//function doubleAfter2Seconds( x )
//{
//	return new Promise( resolve =>
//	{
//		setTimeout( () =>
//		{
//			resolve( x * 2 );

//		}, 2000);
//	});
//}

//async function addAsync( x )
//{
//	const a = await doubleAfter2Seconds( 10 );
//	console.debug( "await:a:", a );

//	const b = await doubleAfter2Seconds( 20 );
//	console.debug( "await:b:", b );

//	const c = await doubleAfter2Seconds( 30 );
//	console.debug( "await:c:", c );

//	return x + a + b + c;
//}

////addAsync( 10 ).then( ( sum ) =>
////{
////	console.log(sum);
////});