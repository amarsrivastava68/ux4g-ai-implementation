
import React, { useState } from 'react';
import './TSRSRegistration.css';

const TSRSRegistration = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [formData, setFormData] = useState({
    // Step 1: Entity Information
    millName: '',
    existingSerial: '',
    managementType: '',
    panNumber: '',
    gstinNumber: '',
    panFile: null,
    // Step 2: Factory/Office Location
    address: '',
    state: '',
    district: '',
    pinCode: '',
    // Step 3: Registration Details
    registrationType: '',
    registrationNumber: '',
    dateOfCommencement: '',
    registrationCertificate: null,
    // Step 4: Contact Person
    contactPersonName: '',
    mobileNumber: '',
    email: '',
    captcha: ''
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'file' ? files[0] : value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};

    switch (step) {
      case 1:
        if (!formData.millName.trim()) newErrors.millName = 'Mill name is required';
        if (!formData.managementType) newErrors.managementType = 'Management type is required';
        if (!formData.gstinNumber.trim()) newErrors.gstinNumber = 'GSTIN Number is required';
        if (!formData.panNumber.trim()) newErrors.panNumber = 'PAN Number is required';
        break;
      case 2:
        if (!formData.address.trim()) newErrors.address = 'Address is required';
        if (!formData.state) newErrors.state = 'State is required';
        if (!formData.district) newErrors.district = 'District is required';
        if (!formData.pinCode.trim()) newErrors.pinCode = 'Pin Code is required';
        break;
      case 3:
        if (!formData.registrationType) newErrors.registrationType = 'Registration type is required';
        if (!formData.registrationNumber.trim()) newErrors.registrationNumber = 'Registration number is required';
        if (!formData.dateOfCommencement) newErrors.dateOfCommencement = 'Date is required';
        break;
      case 4:
        if (!formData.contactPersonName.trim()) newErrors.contactPersonName = 'Name is required';
        if (!formData.mobileNumber.trim()) newErrors.mobileNumber = 'Mobile number is required';
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        if (!formData.captcha.trim()) newErrors.captcha = 'Captcha is required';
        break;
      default:
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < 4) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSaveDraft = () => {
    console.log('Saving draft...', formData);
    alert('Draft saved successfully!');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep(currentStep)) {
      console.log('Form submitted:', formData);
      setShowSuccessModal(true);
    }
  };

  const handleFileUpload = (e) => {
    const { name } = e.target;
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, [name]: file }));
    }
  };

  const closeModal = () => {
    setShowSuccessModal(false);
    // Reset form or redirect
  };

  const renderStepIndicator = () => {
    const steps = [
      { number: 1, title: 'Entity Details', icon: '1' },
      { number: 2, title: 'Documents', icon: '2' },
      { number: 3, title: 'Contact Person', icon: '3' }
    ];

    return (
      <div className="stepper-container">
        {steps.map((step, index) => (
          <React.Fragment key={step.number}>
            <div className="stepper-item">
              <div className={`stepper-circle ${currentStep >= step.number ? 'active' : ''} ${currentStep > step.number ? 'completed' : ''}`}>
                {currentStep > step.number ? (
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M13.5 4.5L6 12L2.5 8.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ) : (
                  step.icon
                )}
              </div>
              <div className={`stepper-label ${currentStep >= step.number ? 'active' : ''}`}>
                {step.title}
              </div>
            </div>
            {index < steps.length - 1 && (
              <div className={`stepper-line ${currentStep > step.number ? 'completed' : ''}`}></div>
            )}
          </React.Fragment>
        ))}
      </div>
    );
  };

  const renderStep1 = () => (
    <div className="step-content">
      <h3 className="step-title">1. Entity Information</h3>
      
      <div className="row">
        <div className="col-md-6 mb-3">
          <label htmlFor="millName" className="form-label">Name of Mill / Unit / Trader <span className="text-danger">*</span></label>
          <input
            type="text"
            className={`form-control ${errors.millName ? 'is-invalid' : ''}`}
            id="millName"
            name="millName"
            value={formData.millName}
            onChange={handleInputChange}
            placeholder="Enter Registered Name"
          />
          {errors.millName && <div className="invalid-feedback">{errors.millName}</div>}
        </div>
        
        <div className="col-md-6 mb-3">
          <label htmlFor="existingSerial" className="form-label">Existing Mill Serial No. (if any) <span className="text-danger">*</span></label>
          <input
            type="text"
            className="form-control"
            id="existingSerial"
            name="existingSerial"
            value={formData.existingSerial}
            onChange={handleInputChange}
            placeholder="e.g. 123242353"
          />
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 mb-3">
          <label htmlFor="managementType" className="form-label">Management Type <span className="text-danger">*</span></label>
          <select
            className={`form-select ${errors.managementType ? 'is-invalid' : ''}`}
            id="managementType"
            name="managementType"
            value={formData.managementType}
            onChange={handleInputChange}
          >
            <option value="">Select Management</option>
            <option value="private">Private</option>
            <option value="public">Public</option>
            <option value="government">Government</option>
            <option value="cooperative">Cooperative</option>
          </select>
          {errors.managementType && <div className="invalid-feedback">{errors.managementType}</div>}
        </div>

        <div className="col-md-6 mb-3">
          <label htmlFor="panNumber" className="form-label">PAN Number of Unit <span className="text-danger">*</span></label>
          <input
            type="text"
            className={`form-control ${errors.panNumber ? 'is-invalid' : ''}`}
            id="panNumber"
            name="panNumber"
            value={formData.panNumber}
            onChange={handleInputChange}
            placeholder="ABCD12345"
          />
          {errors.panNumber && <div className="invalid-feedback">{errors.panNumber}</div>}
        </div>
      </div>

      <div className="row">
        <div className="col-md-12 mb-3">
          <label htmlFor="gstinNumber" className="form-label">GSTIN Number <span className="text-danger">*</span></label>
          <input
            type="text"
            className={`form-control ${errors.gstinNumber ? 'is-invalid' : ''}`}
            id="gstinNumber"
            name="gstinNumber"
            value={formData.gstinNumber}
            onChange={handleInputChange}
            placeholder="27123456789AR1"
          />
          {errors.gstinNumber && <div className="invalid-feedback">{errors.gstinNumber}</div>}
        </div>
      </div>

      <div className="row">
        <div className="col-md-12 mb-3">
          <label htmlFor="panFile" className="form-label">Upload Pan Copy <span className="text-danger">*</span></label>
          <div className="upload-area">
            <input
              type="file"
              className="form-control"
              id="panFile"
              name="panFile"
              onChange={handleFileUpload}
              accept=".svg,.png,.jpg,.gif,.pdf"
            />
            <div className="upload-placeholder">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <p className="mt-2"><span className="text-primary">Click to upload</span> or drag and drop</p>
              <p className="text-muted small">SVG, PNG, JPG or GIF (max. 2MB & 800×800px)</p>
            </div>
            {formData.panFile && (
              <div className="mt-2 text-success">
                <small>File selected: {formData.panFile.name}</small>
              </div>
            )}
          </div>
        </div>
      </div>

      <h5 className="mt-4 mb-3">2. Factory / Office Location</h5>
      
      <div className="row">
        <div className="col-md-12 mb-3">
          <label htmlFor="address" className="form-label">Address <span className="text-danger">*</span></label>
          <textarea
            className={`form-control ${errors.address ? 'is-invalid' : ''}`}
            id="address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            rows="3"
            placeholder="Type here..."
          ></textarea>
          {errors.address && <div className="invalid-feedback">{errors.address}</div>}
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 mb-3">
          <label htmlFor="state" className="form-label">State <span className="text-danger">*</span></label>
          <select
            className={`form-select ${errors.state ? 'is-invalid' : ''}`}
            id="state"
            name="state"
            value={formData.state}
            onChange={handleInputChange}
          >
            <option value="">Select State</option>
            <option value="maharashtra">Maharashtra</option>
            <option value="delhi">Delhi</option>
            <option value="karnataka">Karnataka</option>
            <option value="tamil-nadu">Tamil Nadu</option>
          </select>
          {errors.state && <div className="invalid-feedback">{errors.state}</div>}
        </div>

        <div className="col-md-6 mb-3">
          <label htmlFor="district" className="form-label">District <span className="text-danger">*</span></label>
          <select
            className={`form-select ${errors.district ? 'is-invalid' : ''}`}
            id="district"
            name="district"
            value={formData.district}
            onChange={handleInputChange}
          >
            <option value="">Select Disctrict</option>
            <option value="mumbai">Mumbai</option>
            <option value="pune">Pune</option>
            <option value="nashik">Nashik</option>
          </select>
          {errors.district && <div className="invalid-feedback">{errors.district}</div>}
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 mb-3">
          <label htmlFor="pinCode" className="form-label">Pin Code <span className="text-danger">*</span></label>
          <input
            type="text"
            className={`form-control ${errors.pinCode ? 'is-invalid' : ''}`}
            id="pinCode"
            name="pinCode"
            value={formData.pinCode}
            onChange={handleInputChange}
            placeholder="Type here..."
          />
          {errors.pinCode && <div className="invalid-feedback">{errors.pinCode}</div>}
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="step-content">
      <h3 className="step-title">3. Registration Details</h3>
      
      <div className="row">
        <div className="col-md-6 mb-3">
          <label htmlFor="registrationType" className="form-label">Registration Type <span className="text-danger">*</span></label>
          <select
            className={`form-select ${errors.registrationType ? 'is-invalid' : ''}`}
            id="registrationType"
            name="registrationType"
            value={formData.registrationType}
            onChange={handleInputChange}
          >
            <option value="">Select Registration Type</option>
            <option value="new">New Registration</option>
            <option value="renewal">Renewal</option>
            <option value="modification">Modification</option>
          </select>
          {errors.registrationType && <div className="invalid-feedback">{errors.registrationType}</div>}
        </div>

        <div className="col-md-6 mb-3">
          <label htmlFor="registrationNumber" className="form-label">Registration Number <span className="text-danger">*</span></label>
          <input
            type="text"
            className={`form-control ${errors.registrationNumber ? 'is-invalid' : ''}`}
            id="registrationNumber"
            name="registrationNumber"
            value={formData.registrationNumber}
            onChange={handleInputChange}
            placeholder="Valid Registration No."
          />
          {errors.registrationNumber && <div className="invalid-feedback">{errors.registrationNumber}</div>}
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 mb-3">
          <label htmlFor="dateOfCommencement" className="form-label">Date of Commencement <span className="text-danger">*</span></label>
          <input
            type="date"
            className={`form-control ${errors.dateOfCommencement ? 'is-invalid' : ''}`}
            id="dateOfCommencement"
            name="dateOfCommencement"
            value={formData.dateOfCommencement}
            onChange={handleInputChange}
          />
          {errors.dateOfCommencement && <div className="invalid-feedback">{errors.dateOfCommencement}</div>}
        </div>
      </div>

      <div className="row">
        <div className="col-md-12 mb-3">
          <label htmlFor="registrationCertificate" className="form-label">Registration Certificate (PDF)</label>
          <div className="upload-area">
            <input
              type="file"
              className="form-control"
              id="registrationCertificate"
              name="registrationCertificate"
              onChange={handleFileUpload}
              accept=".pdf,.png,.jpg"
            />
            <div className="upload-placeholder">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <p className="mt-2"><span className="text-primary">Click to upload</span> or drag and drop</p>
              <p className="text-muted small">SVG, PNG, JPG or GIF (max. 2MB & 800×800px)</p>
            </div>
            {formData.registrationCertificate && (
              <div className="mt-2 text-success">
                <small>File selected: {formData.registrationCertificate.name}</small>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="step-content">
      <h3 className="step-title">4. Contact Person</h3>
      
      <div className="row">
        <div className="col-md-12 mb-3">
          <label htmlFor="contactPersonName" className="form-label">Contact Person Name <span className="text-danger">*</span></label>
          <input
            type="text"
            className={`form-control ${errors.contactPersonName ? 'is-invalid' : ''}`}
            id="contactPersonName"
            name="contactPersonName"
            value={formData.contactPersonName}
            onChange={handleInputChange}
            placeholder="Type here..."
          />
          {errors.contactPersonName && <div className="invalid-feedback">{errors.contactPersonName}</div>}
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 mb-3">
          <label htmlFor="mobileNumber" className="form-label">Mobile Number <span className="text-danger">*</span></label>
          <input
            type="tel"
            className={`form-control ${errors.mobileNumber ? 'is-invalid' : ''}`}
            id="mobileNumber"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleInputChange}
            placeholder="10 Digit Mobile Number"
          />
          {errors.mobileNumber && <div className="invalid-feedback">{errors.mobileNumber}</div>}
        </div>

        <div className="col-md-6 mb-3">
          <label htmlFor="email" className="form-label">Email <span className="text-danger">*</span></label>
          <input
            type="email"
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="email@example.com"
          />
          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 mb-3">
          <label htmlFor="captcha" className="form-label">Enter Captcha <span className="text-danger">*</span></label>
          <div className="d-flex align-items-center gap-3">
            <input
              type="text"
              className={`form-control ${errors.captcha ? 'is-invalid' : ''}`}
              id="captcha"
              name="captcha"
              value={formData.captcha}
              onChange={handleInputChange}
              placeholder="Type here..."
            />
            <div className="captcha-display">
              <span className="captcha-text">0 ⇒ 5 = </span>
              <button type="button" className="btn btn-link p-0">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M1 4v6h6M23 20v-6h-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
          {errors.captcha && <div className="invalid-feedback d-block">{errors.captcha}</div>}
        </div>
      </div>
    </div>
  );

  const renderRequiredDocuments = () => (
    <div className="card required-docs">
      <div className="card-body">
      <h5 className="card-title">Required Documents</h5>
      <ul className="list-unstyled mb-0">
        <li className="mb-2">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="me-2">
          <polygon points="8,2 14,14 2,14" fill="currentColor"/>
        </svg>
        PAN Card
        </li>
        <li className="mb-2">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="me-2">
          <polygon points="8,2 14,14 2,14" fill="currentColor"/>
        </svg>
        Registration Certificate
        </li>
        <li className="mb-2">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="me-2">
          <polygon points="8,2 14,14 2,14" fill="currentColor"/>
        </svg>
        Address Proof
        </li>
        <li>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="me-2">
          <polygon points="8,2 14,14 2,14" fill="currentColor"/>
        </svg>
        GSTIN Details
        </li>
      </ul>
      </div>
    </div>
    );

  const renderNeedHelp = () => (
    <div className="card need-help mt-3">
      <div className="card-body">
        <h5 className="card-title">Need Help?</h5>
        <ul className="list-unstyled mb-0">
          <li className="mb-2">
            <a href="#" className="text-decoration-none">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="me-2">
          <polygon points="8,2 14,14 2,14" fill="currentColor"/>
              </svg>
              View User Manual
            </a>
          </li>
          <li className="mb-2">
            <a href="#" className="text-decoration-none">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="me-2">
          <polygon points="8,2 14,14 2,14" fill="currentColor"/>
              </svg>
              Watch Tutorial Video
            </a>
          </li>
          <li>
            <a href="#" className="text-decoration-none">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="me-2">
          <polygon points="8,2 14,14 2,14" fill="currentColor"/>
              </svg>
              Contact Support
            </a>
          </li>
        </ul>
      </div>
    </div>
  );

  return (
    <div className="tsrs-registration-container">
      <div className="header-section">
        <a href="/" className="back-link">← Back</a>
        <span className="divider">|</span>
        <span className="new-registration-badge">New Registration</span>
      </div>

      <div className="registration-header">
        <h2>TSRS Registration</h2>
        <p className="text-muted">Complete your textile unit registration</p>
      </div>

      {renderStepIndicator()}

      <div className="registration-content">
        <div className="row">
          <div className="col-lg-8">
            <div className="card form-card">
              <div className="card-body">
                {currentStep === 1 && renderStep1()}
                {currentStep === 2 && renderStep2()}
                {currentStep === 3 && renderStep3()}

                <div className="form-footer">
                  <p className="text-muted small">
                    <span className="text-danger">*</span>Required Fields: All marked fields are mandatory for registration
                  </p>
                  
                  <div className="button-group">
                    <button 
                      type="button" 
                      className="btn btn-outline-primary"
                      onClick={handleSaveDraft}
                    >
                      Save as Draft
                    </button>
                    
                    <div className="navigation-buttons">
                      {currentStep > 1 && (
                        <button 
                          type="button" 
                          className="btn btn-outline-secondary"
                          onClick={handlePrevious}
                        >
                          Previous
                        </button>
                      )}
                      
                      {currentStep < 3 && (
                        <button 
                          type="button" 
                          className="btn btn-primary"
                          onClick={handleNext}
                        >
                          Next
                        </button>
                      )}
                      
                      {currentStep === 3 && (
                        <button 
                          type="submit" 
                          className="btn btn-primary"
                          onClick={handleSubmit}
                        >
                          Submit
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            {renderRequiredDocuments()}
            {renderNeedHelp()}
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header border-0">
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={closeModal}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body text-center py-4">
                <div className="success-icon mb-3">
                  <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                    <circle cx="40" cy="40" r="40" fill="#22C55E" fillOpacity="0.1"/>
                    <circle cx="40" cy="40" r="30" fill="#22C55E"/>
                    <path d="M25 40L35 50L55 30" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h4 className="text-primary mb-3">Registration application submitted successfully</h4>
                <p className="mb-1">Your application ID: <strong>TSRS-2025-001234</strong></p>
                
                <div className="next-steps mt-4 p-3 bg-light rounded text-start">
                  <h6 className="mb-2">What happens next?</h6>
                  <ol className="mb-0 ps-3">
                    <li>Regional Officer will review your application</li>
                    <li>You'll receive email updates on status</li>
                    <li>If approved, you'll get TuID & login credentials</li>
                    <li>Expected timeline: 5-7 working days</li>
                  </ol>
                </div>

                <button 
                  type="button" 
                  className="btn btn-primary mt-4"
                  onClick={closeModal}
                >
                  Track Application Status
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TSRSRegistration;