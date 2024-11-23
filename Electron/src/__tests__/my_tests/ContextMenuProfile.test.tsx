import { render, fireEvent, screen } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';
import ContextMenuProfile from '../../components/AdvancedUIComponents/ContextMenu/Profile/ContextMenuProfile';
import { getTokenUsername, getTokenRole } from '../../utils/token';

// Mocking necessary functions
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));
jest.mock('../../utils/token', () => ({
  getTokenUsername: jest.fn(),
  getTokenRole: jest.fn(),
}));

describe('ContextMenuProfile component', () => {
  const navigate = jest.fn();
  const mockHandleClose = jest.fn();
  const mockHandleLogout = jest.fn();

  beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(navigate);
    jest.clearAllMocks();
  });

  test('testHandleClickProfile', () => {
    // Mock return values for username and role
    (getTokenUsername as jest.Mock).mockReturnValue('testUser');
    (getTokenRole as jest.Mock).mockReturnValue('admin');

    // Render the component with necessary props
    render(
      <ContextMenuProfile
        handleClose={mockHandleClose}
        handleLogout={mockHandleLogout}
      />,
    );

    // Simulate profile button click with updated text
    const profileButton = screen.getByText(/Perfil/i);
    fireEvent.click(profileButton);

    // Assertions
    expect(getTokenUsername).toHaveBeenCalled();
    expect(getTokenRole).toHaveBeenCalled();
    expect(navigate).toHaveBeenCalledWith(`/undefined/testUser`);
    expect(mockHandleClose).toHaveBeenCalled();
  });

  test('testHandleClickLogout', () => {
    render(
      <ContextMenuProfile
        handleClose={mockHandleClose}
        handleLogout={mockHandleLogout}
      />,
    );

    // Simulate logout button click
    const logoutButton = screen.getByText(/Cerrar sesión/i);
    fireEvent.click(logoutButton);

    // Assertions
    expect(mockHandleLogout).toHaveBeenCalledWith(false);
  });
});
