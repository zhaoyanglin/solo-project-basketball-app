import parkReducer from '../../redux/reducers/parkReducer';

describe('testing parkReducer', () => {
    test('should have the correct initial state', () => {
        const action = { type: 'INITIALIZE' }
        const returnedState = parkReducer(undefined, action)
        expect(returnedState).toEqual([])
    })
})