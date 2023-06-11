import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { Button, Switch } from '@mui/material';


describe('Server Response Test', () => {
  it('should have the correct structure', async () => {
    const mock = new MockAdapter(axios);

    const serverResponse = {
      id: 'id',
      createdBy: {
        firstName: 'first',
        lastName: 'last',
      },
      contributors: [
        {
          id: 'contributor id',
          firstName: 'first',
          lastName: 'last',
        },
      ],
      lastModified: 'date',
      enabled: true,
      title: 'title',
      description: 'description',
      content: 'content',
      formats: [
        {
          width: 10,
          height: 10,
        },
      ],
    };

    mock.onGet('http://localhost:3001/creatives').reply(200, serverResponse);

    const response = await axios.get('http://localhost:3001/creatives');

    expect(response.data).to.have.property('id');
    expect(response.data).to.have.property('createdBy');
    expect(response.data).to.have.property('contributors');
    expect(response.data).to.have.property('lastModified');
    expect(response.data).to.have.property('enabled');
    expect(response.data).to.have.property('title');
    expect(response.data).to.have.property('description');
    expect(response.data).to.have.property('content');
    expect(response.data).to.have.property('formats');
  });
});

test('CTA Supprimer Test', () => {
  const handleDeleteMock = vitest.fn();

  render(
    <Button onClick={handleDeleteMock}>Supprimer</Button>
  );

  const deleteButton = screen.getByRole('button', { name: 'Supprimer' });
  expect(deleteButton).toBeInTheDocument();

  fireEvent.click(deleteButton);

  expect(handleDeleteMock).toHaveBeenCalled();
});

test('CTA Annuler Test', () => {
  const handleCancelMock = vitest.fn();

  render(
    <Button onClick={handleCancelMock}>Annuler</Button>
  );

  const cancelButton = screen.getByRole('button', { name: 'Annuler' });
  expect(cancelButton).toBeInTheDocument();

  fireEvent.click(cancelButton);

  expect(handleCancelMock).toHaveBeenCalled();
});

test('CTA Sauvegarder Test', () => {
  const handleSaveMock = vitest.fn();

  render(
    <Button onClick={handleSaveMock}>Sauvegarder</Button>
  );

  const saveButton = screen.getByRole('button', { name: 'Sauvegarder' });
  expect(saveButton).toBeInTheDocument();

  fireEvent.click(saveButton);

  expect(handleSaveMock).toHaveBeenCalled();
});

test('Switch Button Test', () => {
  const handleSwitchMock = vitest.fn();

  render(
    <Switch checked={true} onChange={() => handleSwitchMock('argument1', 'argument2')} />
  );

  const switchButton = screen.getByRole('checkbox');
  expect(switchButton).toBeInTheDocument();

  fireEvent.click(switchButton);

  expect(handleSwitchMock).toHaveBeenCalled();
});