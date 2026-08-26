---
title: "json parser 사용 및 매니저를 이용한 관리"

categories:
 - Cpp

tags:
 - Cpp

date: 2026-08-26

last_modified_at: 2026-08-26
toc_sticky: true

---

#### rvalue에 대한 생각

````
#include <iostream>
#include <format>

using namespace std;

void handleMessage(string& message);

// lvalue
void handleMessage(string& message)
{
	cout << format("handleMessagw with lvalue reference: {}", message) << endl;
}

// rvalue
void handleMessage(string&& message)
{
	cout << format("handleMessage with rvalue reference: {}", message) << endl;
}

int main()
{
	string a{ "Hello" };
	string b{ "World" };

	handleMessage(a);
	handleMessage(a+b);
}


````

- 변수의 특성을 가진 매개변수를 이용할 때는 lvalue가 사용됨.
- 변수를 제외한 나머지 성질을 이용할 때는 rvalue가 사용됨.
- handleMessage()를 각각 오버로드한 함수를 사용할 때 변수만 사용되는 handleMessage(a)를 호출 할 시 위의 lvalue의 함수가 호출되지만 변수 두 개가 산술연산자에 의해 합쳐질 때 해당 변수의 매개변수는 임시객체로 넘겨지게 된다
  - 이때 해당 변수들의 주소값을 확인 시 lvalue의 경우 해당 메모리 주소에 상주해 있지만 rvalue의 함수를 호출 할 때는 두 변수가 합쳐져 만들어진 "HelloWorld"라는 임시객체가 다른 주소에 만들어져 있다.
- rvalue를 호출하는 함수의 매개변수 역시 값 자체는 lvalue기 때문에 해당 값을 lvalue에 사용할려면 std::move를 이용하여 lvalue로 만들어 줘야한다.

