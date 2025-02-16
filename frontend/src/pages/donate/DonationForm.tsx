import { useParams } from "react-router-dom"

const DonationForm = () => {
	const { id } = useParams();
	
	return (
		<div>
			{id}
		</div>
	)
}

export default DonationForm;