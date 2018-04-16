import 'jest-enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });
const mockMath = Object.create(global.Math);
mockMath.random = () => 0.5;
global.Math = mockMath;
