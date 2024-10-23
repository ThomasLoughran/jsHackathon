/*
 */
import {elapsedTime, toPrecision} from './benchmark/utils.js';

type PerformanceContext = {
  name: string;
  count: number;
  usedTime: number;
  parent: PerformanceContext;
  children: Record<string, PerformanceContext>;
};
const rootContext: PerformanceContext = {
  name: 'root',
  count: 0,
  usedTime: 0,
  parent: null as unknown as PerformanceContext,
  children: {},
};

let currentContext: PerformanceContext = rootContext;

export const measurePerformance = <T>(name: string, task: () => T): T => {
  if (!currentContext.children[name]) {
    currentContext.children[name] = {
      parent: currentContext,
      name,
      count: 0,
      usedTime: 0,
      children: {},
    };
  }

  currentContext = currentContext.children[name];
  currentContext.count++;
  const start = process.hrtime();
  const result = task();
  currentContext.usedTime += elapsedTime(start);
  currentContext = currentContext.parent;

  return result;
};

export const resetPerformance = () => {
  rootContext.children = {};
  currentContext = rootContext;
};

export const printPerformance = (context = rootContext, spaces = 2) => {
  const indentation = ' '.repeat(spaces);
  Object.values(context.children).forEach((ctx) => {
    console.log(
      indentation +
        `Task ${ctx.name} | Called ${ctx.count} time(s) | used ${toPrecision(
          ctx.usedTime
        )}s | average ${toPrecision(ctx.usedTime / ctx.count)}s`
    );
    printPerformance(ctx, spaces + 2);
  });
};
