import loginReducer from '../../redux/reducers/loginModeReducer';

describe('testing loginModeReducer', () => {
    test('should have the correct initial state', () => {
        const action = {type: 'INITIALIZE'}
        const returnedState = loginReducer(undefined, action)
        expect(returnedState).toBe('login')
    })
    test('should have the correct initial state', () => {
        const action = { type: 'SET_TO_REGISTER_MODE' }
        const returnedState = loginReducer(undefined, action)
        expect(returnedState).toBe('register')
    })
} )



