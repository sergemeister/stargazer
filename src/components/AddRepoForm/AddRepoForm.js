import React from 'react';
import { Form, InputGroup, FormControl, Button } from 'react-bootstrap';
import './AddRepoForm.css'

const AddRepoForm = () => {

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return(
    <Form className="add-repo-form">
      <InputGroup className="mb-3">
        <FormControl
          placeholder="Enter repository name, eg. facebook/react"
          pattern="([^\/\s]+\/[a-zA-z0-9]*)"
          title="Should contain {repo}/{owner}, eg. facebook/react"
          required
        />
        <InputGroup.Append>
          <Button
            type="submit"
            variant="info"
          >
            Add
          </Button>
        </InputGroup.Append>
      </InputGroup> 
    </Form>
  )
}

export default AddRepoForm;
