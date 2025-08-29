import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { getCropById } from '../api/cropapis';
import DashboardHeader from '../components/DashboardHeader';
import Footer from '../components/Footer';

const CropInfo = ({ user }) => {
    const { id } = useParams();
    const [crop, setCrop] = useState(null);

    useEffect(() => {
        const fetchCropInfo = async () => {
            const response = await getCropById(id);
            if (response) {
                setCrop(response);
                console.log(response);
            }
        };
        fetchCropInfo();
    }, [id]);

    return (
        <>
            <DashboardHeader user={user} />
            <div className="container p-3" style={{ marginTop: "5.5rem", marginBottom: "5rem" }}>
                <div className="card mb-3 p-3 shadow-sm">
                    <div className="row g-3">
                        {/* Image Section */}
                        <div className="col-12 col-md-4">
                            <img
                                src={crop?.image_url}
                                className="img-fluid rounded"
                                alt={crop?.name}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                        </div>

                        {/* Text Section */}
                        <div className="col-12 col-md-8">
                            <div className="card-body">
                                <h3 className="card-title">{crop?.name}</h3>
                                <h5 className="card-text">{crop?.description}</h5>
                                <p className="card-text">{crop?.detailed_description}</p>

                                <h5 className="card-title">Health contents</h5>
                                <p className="card-text">{crop?.health_contents}</p>

                                <h5 className="card-title">Conditions of growth</h5>
                                <p className="card-text">{crop?.conditions_of_growth}</p>

                                <p className="card-text">
                                    <small className="text-muted">
                                        Read more from{" "}
                                        <a
                                            href={crop?.link_to_wikipedia}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            here
                                        </a>
                                    </small>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default CropInfo
