---
title: "함수 포인터를 이용한 간단한 계산"
date: "2024-12-30"
last_modified_at: "2024-12-30"
---



```
#include <iostream>

using namespace std;

using calculate = int(*)(int a, int b);

int Add(int a, int b) { return a + b; }
int Subtraction(int a, int b) { return a - b; }

int main() 
{
	int(*calptr)(int a, int b);
	calculate cal[2] = { &Add, &Subtraction };

	calptr = Subtraction;
	int n, m, num;

	cout << "원하는 값을 넣어주세요: ";
	cin >> n >> m;
	
	cout << "원하는 계산을 선택해 주세요"<< endl;
	cout << "1. 더하기" << endl;
	cout << "2. 빼기" << endl;
	cin >> num;

	switch (num)
	{
	case 1:
	{
		cout << cal[0](n, m);
		break;
	}
	case 2:
	{
		cout << calptr(n, m);
		break;
	}
	default:
		break;
	}

	return 0;	
}
```

- 의문점

```
int(*calptr)(int a, int b);
```

```
using calculate = int(*)(int a, int b);
calculate cal[2] = { &Add, &Subtraction };
```

- 위의 코드에서 \[using\]을 사용한 코드와 아닌 코드의 차이는 무엇인가?



두 코드의 차이는  \[using\]이라는 타입 별칭을 통해 int(*)(int a, int b)값을 calculate라는 타입으로 새로 만든 것이고 

int(*calptr)(int a, int b)문구는 새로 함수 포인터 변수를 생성한 것이다

- 그럼 &의 사용 유무에 따른 차이가 존재하는가?

이 변수 또는 별칭은 함수 포인터를 담고 있습니다 라는 것을 명시적으로 나타내는 것이지 사용 유무에 따라 성능이나 기능에 영향을 미치지는 않는다(생략해도 상관없음)



