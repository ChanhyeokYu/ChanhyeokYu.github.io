---
title: "액터 컴포넌트 분리리"

categories:
 - Cpp

tags:
 - Cpp

date: 2025-01-06

last_modified_at: 2025-01-06
toc_sticky: true
---



##### 구조체를 통한 컴포넌트 정보 전달

```cpp
UStatusComponent* statusComponent = OtherActor->GetComponentByClass<UStatusComponent>();

statusComponent->CalculateStatus(_damageComponent->SetDamageDate());
```

> Hit 함수를 통해 타격된 상대의 컴포넌트를 받아 구조체에 입력된 정보를 상대 상태 컴포넌트에 전달

> 해당 객체의 안정성을 위해 스마트 포인터를 이용

---



- 왜 이렇게 했나?

> 액터의 상태를 나타낸 컴포넌트와 데미지를 주는 컴포넌트의 분리를 통해 각 액터와의 의존성과 캡슐화를 최대한 끌어올리기 위해 정보를 전달하는 데이터까지 구조체로 따로 뺴냈다

```c++
USTRUCT(BlueprintType)
struct FDamageDate
{
	GENERATED_BODY()

	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "DamageDate")
	int32 _attackDamageDate;
	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "DamageDate")
	int32 _tickDamageDate;

	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "DamageDate")
	EDamageType _EdamageTypeDate = EDamageType::NONE;
};
```



- 고민거리

> 현재 데미지와 상태 컴포넌트와는 상호 간의 의존성이 강해 묶인 형태로 사용하고 있지만 따로 뺴야되는지 모르겠다 