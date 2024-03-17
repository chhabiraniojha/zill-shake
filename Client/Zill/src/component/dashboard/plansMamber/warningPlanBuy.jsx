import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const WarningModal = ({ showWarning, handleShowWarning, selectedPlan }) => {
	return (
		<Modal show={showWarning} onHide={() => handleShowWarning(false)}>
			<Modal.Title>Warning</Modal.Title>
			<Modal.Header>
				<h6>Are you sure you want to terminate this plan?</h6>
			</Modal.Header>
			<Modal.Body>
				<p>This action cannot be undone.</p>
				<p>10% charges will be applied for processing means if your termination plan cost is 10$ then you will get 9$.</p>
			</Modal.Body>
			<Modal.Footer>
				<Link to={`/terminate?plan=${selectedPlan}`}>
					<Button variant="danger">Yes</Button>
				</Link>
				<Button
					variant="success"
					onClick={() => {
						handleShowWarning(false);
					}}>
					No
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default WarningModal;