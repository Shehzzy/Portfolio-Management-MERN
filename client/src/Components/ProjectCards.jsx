import React from 'react'

function ProjectCards({imgSrc, projectHeading, projectNumbers}) {
  return (
    <>
    <div className="col-lg-4 col-md-4 col-sm-12">
            <div className="card">
              <div className="card-body d-flex justify-content-between">
                <div className="d-flex align-items-center">
                  <img src={imgSrc} alt="" className='img-icon' />
                  <h5>{projectHeading}</h5>
                </div>
                <h1>{projectNumbers}</h1>
              </div>
            </div>
          </div>
    </>
  )
}

export default ProjectCards
