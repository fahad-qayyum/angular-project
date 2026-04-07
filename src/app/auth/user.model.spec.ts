import {User} from './user.model';

describe('User Model', () => {
  it('should create a user with email, id, token, and expiration date', () => {
    const futureDate = new Date(Date.now() + 3600000);
    const user = new User('test@test.com', '123', 'abc-token', futureDate);
    expect(user.email).toBe('test@test.com');
    expect(user.id).toBe('123');
  });

  it('should return the token if expiration date is in the future', () => {
    const futureDate = new Date(Date.now() + 3600000);
    const user = new User('test@test.com', '123', 'abc-token', futureDate);
    expect(user.token).toBe('abc-token');
  });

  it('should return null if token has expired', () => {
    const pastDate = new Date(Date.now() - 3600000);
    const user = new User('test@test.com', '123', 'abc-token', pastDate);
    expect(user.token).toBeNull();
  });

  it('should return null if expiration date is not set', () => {
    const user = new User('test@test.com', '123', 'abc-token', null);
    expect(user.token).toBeNull();
  });
});
