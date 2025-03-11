import { useToggle } from '../useToggle';

describe('useToggle (Solid)', () => {
  it('应该使用默认值初始化toggle状态', () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [value, toggle] = useToggle();
    expect(value()).toBe(false);
  });

  it('应该使用提供的初始值初始化toggle状态', () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [value, toggle] = useToggle(true);
    expect(value()).toBe(true);
  });

  it('应该切换toggle状态', () => {
    const [value, toggle] = useToggle(false);
    
    toggle();
    expect(value()).toBe(true);
    
    toggle();
    expect(value()).toBe(false);
  });

  it('应该设置特定的toggle状态', () => {
    const [value, toggle] = useToggle(false);
    
    toggle(true);
    expect(value()).toBe(true);
    
    toggle(false);
    expect(value()).toBe(false);
  });
});