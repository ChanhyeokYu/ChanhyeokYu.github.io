---
title: "가상 함수를 이용한 클래스 분배"

categories:
 - Cpp

tags:
 - Cpp

date: 2025-01-06

last_modified_at: 2025-01-06
toc_sticky: true
---

###### 가상 함수를 이용한 클래스 상속

```cpp
class ISkill
{
public:
	ISkill() {}
	virtual ~ISkill() = default;
	virtual void Apply() abstract;

};

class MeleeSkill : public ISkill
{
public:
	MeleeSkill(int32 damage) : _damage(damage){}
	virtual void Apply() override;

private:
	int32 _damage = 0;
};
```

- 각각의 고유한 클래스를 이용해 각 개체마다 의존성의 최대한 끊어내고 관리에 용의함 둠
- 실수한 점
  - 클래스 상속시 부모 클래스의 접근지정자를 정확히 명시하지 않을 경우 클래스는 private로 보기 때문에 확인할 것

##### 함수 객체를 이용한 정보 교환

```cpp
class IsAttack
{
public:
	virtual ~IsAttack();
	virtual void operator()(Object& attackter, Object& target) abstract;
	//추가적으로 필요한 정보 입력
};
```

- 해당 클래스를 \[Player.h\]의 클래스에 담아 후에 사용할 \[Battlemanager\]를 통해 서로 간의 피해에 대한 정보를 함수 객체에 담아 일괄적으로 관리