import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import DashboardHeader from '../components/DashboardHeader';
import { getallCrops } from '../api/cropapis';
import SearchBar from '../components/searchBar/SearchBar';
import { useNavigate } from 'react-router-dom';

const CropIdentity = ({ user }) => {
    const [crops, setCrops] = useState([]);
    const [filteredCrops, setFilteredCrops] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCrops = async () => {
            const response = await getallCrops();
            if (response) {
                setCrops(response);
                setFilteredCrops(response); // ✅ show all crops initially
                console.log(response)
            } else {
                console.error("Failed to fetch crops data");
            }
        };
        fetchCrops();
    }, []);

    // 🔍 Handle live search
    const handleSearch = (query) => {
        if (!query.trim()) {
            setFilteredCrops(crops); // reset to all crops if search is empty
        } else {
            const lowerCaseQuery = query.toLowerCase();
            const filtered = crops.filter(crop =>
                crop.name.toLowerCase().includes(lowerCaseQuery) ||
                crop.description.toLowerCase().includes(lowerCaseQuery)
            );
            setFilteredCrops(filtered);
        }
    };

    const handleClick = (id) => {
        navigate(`/cropinfo/${id}`);
    };

    return (
        <>
            <DashboardHeader user={user} />

            <div className="container" style={{ marginTop: "5.5rem" }}>
                <h2>| Relevant crops used with their full description</h2>
                
                {/* ✅ Pass search handler to SearchBar */}
                <SearchBar onSearch={handleSearch} />

                <div className="row g-4 mt-3">
                    {filteredCrops.length > 0 ? (
                        filteredCrops.map(item => (
                            <div className="col-md-4" key={item.id}>
                                <div className="card h-100">
                                    <div style={{ height: '200px', overflow: 'hidden' }}>
                                        <img
                                            className="card-img-top"
                                            src={item.image_path}
                                            alt={item.name}
                                            style={{ height: '100%', width: '100%', objectFit: 'cover' }}
                                        />
                                    </div>
                                    <div className="card-body">
                                        <h5 className="card-title">{item.name}</h5>
                                        <p className="card-text">{item.description}</p>
                                        <button onClick={() => handleClick(item.id)} className="btn btn-primary">
                                            Read More
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-muted text-center">No crops match your search.</p>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default CropIdentity;
