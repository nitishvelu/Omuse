import CoolBox from "../../components/CoolBox";
import { withProtected } from "../../src/hook/route";
import CoolGrid from "../../components/CoolGrid";

function Language() {
	return (
		<CoolGrid title='languages'>
			<CoolBox
				id='english'
				name='English'
				color='#009DAE'
				to='language'
				img='/images/derulo.jpg'
			/>
			<CoolBox
				id='tamil'
				name='Tamil'
				color='#FFE652'
				to='language'
				img='/images/rahman.jpg'
			/>
			<CoolBox
				id='kannada'
				name='Kannada'
				color='#396EB0'
				to='language'
				img='/images/sarja.jpg'
			/>
			<CoolBox
				id='telugu'
				name='Telugu'
				color='#FFC4E1'
				to='language'
				img='/images/dsp.jpg'
			/>
			<CoolBox
				id='hindi'
				name='Hindi'
				color='#AE4CCF'
				to='language'
				img='/images/arijit.jpg'
			/>
			<CoolBox
				id='malayalam'
				name='Malayalam'
				color='#CAF7E3'
				to='language'
				img='/images/vijay.jpg'
			/>
			<CoolBox
				id='japanese'
				name='Japanese'
				color='#046582'
				to='language'
				img='/images/kumi.jpg'
			/>
			<CoolBox
				id='korean'
				name='Korean'
				color='#FFC898'
				to='language'
				img='/images/suga.jpg'
			/>
		</CoolGrid>
	);
}
export default withProtected(Language);
