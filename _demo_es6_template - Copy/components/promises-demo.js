class PromiseDemoClass
{	
	constructor( props )
	{
		console.debug( "props", props );

		this.ID = Symbol( ( Math.random() * 99 ).toFixed( 5 ) );
		//	console.debug( this.ID );

		this.Element = document.getElementById( props.elementID );
		return;
	};
	Display()
	{
		this.Element.innerText = this.ID.toString();
		return;
	};
};
export
{
	PromiseDemoClass as PromiseDemo
};


		//const delay = seconds => {
		//	return new Promise((resolve, reject) => {
		//		if(typeof seconds !== 'number') {
		//			reject(new Error('Argument seconds must be a number'));
		//		}
		//		setTimeout(
		//			() => resolve(`${seconds} second delay is up`), 
		//			seconds * 1000
		//		);
		//	});
		//};

		//console.log("zero seconds");
		//delay("10 Minutes").then(msg => msg.toUpperCase())
		//		.then(msg => `${msg}!!!!!!`)
		//		.then(msg => console.log(msg));
		//delay(2).then(msg => msg.toUpperCase())
		//		.then(msg => `${msg}!!!!!!`)
		//		.then(msg => console.log(msg));		
		