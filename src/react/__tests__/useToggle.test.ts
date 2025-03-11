import { renderHook, act } from '@testing-library/react';
import { useToggle } from '../useToggle';

describe('useToggle (React)', () => {
  it('应该使用默认值初始化toggle状态', () => {
    const { result } = renderHook(() => useToggle());
    expect(result.current[0]).toBe(false);
  });

  it('应该使用提供的初始值初始化toggle状态', () => {
    const { result } = renderHook(() => useToggle(true));
    expect(result.current[0]).toBe(true);
  });

  it('应该切换toggle状态', () => {
    const { result } = renderHook(() => useToggle(false));

    act(() => {
      result.current[1]();
    });

    expect(result.current[0]).toBe(true);

    act(() => {
      result.current[1]();
    });

    expect(result.current[0]).toBe(false);
  });

  it('应该设置特定的toggle状态', () => {
    const { result } = renderHook(() => useToggle(false));

    act(() => {
      result.current[1](true);
    });

    expect(result.current[0]).toBe(true);

    act(() => {
      result.current[1](false);
    });

    expect(result.current[0]).toBe(false);
  });
});