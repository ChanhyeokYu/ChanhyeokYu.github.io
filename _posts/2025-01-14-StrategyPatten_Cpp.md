---
title: "전략 패턴 연습"

categories:
 - Cpp

tags:
 - Cpp

date: 2025-01-14

last_modified_at: 2025-01-14
toc_sticky: true
---

##### 전략 패턴을 사용하여 알고리즘 변경

```
#include <iostream>
#include <algorithm>
#include <assert.h>
#include <queue>

using namespace std;

class StrategyPatten;
class ContextMain;

class StrategyPatten
{
public:
	virtual ~StrategyPatten() = default;
	virtual void ChangeStrategy(vector<vector<int>>& data	, int start) abstract;

};

class BFSStrategy : public StrategyPatten
{
public:
	virtual void ChangeStrategy(vector<vector<int>>& data, int start) override
	{
		cout << "BFS : ";
		BFS(data, start);
		cout << endl;
	}

private:

	void BFS(vector<vector<int>>& graph, int start)
	{
		vector<bool> visited(graph.size(), false);
		queue<int> q;

		visited[start] = true;
		q.push(start);

		while (!q.empty())
		{
			int current = q.front();
			q.pop();
			cout << current << " ";

			for (int next : graph[current])
			{
				if (!visited[next])
				{
					visited[next] = true;
					q.push(next);
				}
			}
		}

	}
};

class DFSStrategy : public StrategyPatten
{
public:
	virtual void ChangeStrategy(vector<vector<int>>& data, int start) override
	{
		cout << "DFS : ";
		DFS(data, start);
		cout << endl;
	}

	void DFSUtill(const vector<vector<int>>& graph, int current, vector<bool>& visited)
	{
		visited[current] = true;
		cout << current << " ";

		for (int next : graph[current])
		{
			if (!visited[next])
			{
				DFSUtill(graph, next, visited);
			}
		}
	}

	void DFS(const vector<vector<int>>& graph, int start)
	{
		vector<bool> visited(graph.size(), false);
		DFSUtill(graph, start, visited);
	}

};

class ContextMain
{
public:
	void SetStrategy(unique_ptr<StrategyPatten> strategy)
	{
		_strategy = move(strategy);
	}

	void Execute(vector<vector<int>>& data)
	{
		if (_strategy)
		{
			_strategy->ChangeStrategy(data,1);
		}
		else
		{
			assert("스토리지 없음");
		}
	}

private:
	unique_ptr<StrategyPatten> _strategy;
};

int main()
{
	vector<vector<int>> data(7);
	data[1] = { 2,3 };
	data[2] = { 1,3 };
	data[3] = { 4,5 };
	data[4] = { 3 };
	data[5] = { 3 };

	ContextMain context;
 	context.SetStrategy(make_unique<BFSStrategy>());
	context.Execute(data);
	context.SetStrategy(make_unique<DFSStrategy>());
	context.Execute(data);


}
```

- 전략 패턴을 이용하여 길 찾기 알고리즘 교체

> 각기 다른 길 찾기 알고리즘을 상황에 맞게 변경하기 위해 전략 패턴을 사용하여 실시간으로 알고리즘 교체 연습

