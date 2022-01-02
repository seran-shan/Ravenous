import { fetch } from "whatwg-fetch";

const apiKey = 'H0dIcHBC5thA8eNVsDgXdG76J0FBMZtEuFzC0R1nyvlIABQz4u7ys_EdumWeA337AA4JbdWxTJnTCU5djhW9z06TWwKT70KRRisKa2SmjYx8PJL6V-o06sz7yvHRYXYx';

const Yelp = {
    search(term, location, sortBy) {
        return fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`, {
            headers: {
                Authorization: `Bearer ${apiKey}` 
            }
        }).then(response => {
            if (response.ok) {
                return response.json();
            } throw new Error('Request failed');
        }).then(jsonResponse => {
            if (jsonResponse.buisnesses) {
                return jsonResponse.buisnesses.map(business => ({
                    id: business.id,
                    imageSrc: business.image_url,
                    name: business.name,
                    address: business.location.address,
                    city: business.location.city,
                    state: business.location.state,
                    zipCode: business.location.zip_code,
                    category: business.categories[0].title,
                    rating: business.rating,
                    reviewCount: business.review_count
                }));
            }
        });
    }
};

export default Yelp;