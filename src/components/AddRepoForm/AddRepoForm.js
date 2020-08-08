import React, { useState } from 'react';
import { Form, InputGroup, FormControl, Button } from 'react-bootstrap';
import './AddRepoForm.css'

const AddRepoForm = () => {
  const [repoName, setRepoName] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(repoName)
  }

  const handleChange = (e) => {
    setRepoName(e.target.value)  
  }

  return(
    <Form
      className="add-repo-form"
      onSubmit={handleSubmit}>
      <InputGroup className="mb-3">
        <FormControl
          onChange={handleChange}
          placeholder="Enter repository name, eg. facebook/react"
          title="Should be formatted as {owner}/{repo}, eg. facebook/react"
          value={repoName}
          pattern="^([\/\s]+\/)([a-zA-z0-9]*)$"
          required
        />
        <InputGroup.Append>
          <Button
            type="submit"
            variant="info">
            Add
          </Button>
        </InputGroup.Append>
      </InputGroup> 
    </Form>
  )
}

export default AddRepoForm;
