---
title: "투사체 타격에 대한 처리"

categories:
 - Unreal
tags:
 - Unreal

date: 2025-01-02
last_modified_at: 2025-01-02

toc_sticky: true
---

##### Onhit에 대한 처리
```cpp
void ABaseProjectlie::OnHit(UPrimitiveComponent* HitComponent, AActor* OtherActor, UPrimitiveComponent* OtherComp, FVector NormalImpulse, const FHitResult& Hit)
{
	// 시그니처의 Hit로는 타격된 대상에게 상호작용
	// 라인 트레이스를 이용해 추가적인 활용
	UE_LOG(LogTemp, Log, TEXT("HIT Comp : %s"), *HitComponent->GetName());
	UE_LOG(LogTemp, Log, TEXT("HIT Comp : %s"), *OtherActor->GetName());
	UE_LOG(LogTemp, Log, TEXT("HIT Comp : %s"), *OtherComp->GetName());

	ULocalPlayer* player = GetWorld()->GetFirstLocalPlayerFromController();
	APlayerController* playercontroller = player->GetPlayerController(GetWorld());
	AActor* actor = Cast<AActor>(playercontroller->GetCharacter());
	if (actor)
	{
		_sphereComponent->IgnoreActorWhenMoving(actor, true);
	}

	AMainCharacter* mainCharacter = Cast<AMainCharacter>(Hit.GetActor());

	FHitResult hitResult;
	FVector start = this->GetActorLocation();
	// 해당 값은 추후 확인 후 수정
	FVector end = OtherActor->GetActorLocation();

	FCollisionQueryParams traceParams(SCENE_QUERY_STAT(LineTrace), true);
	traceParams.AddIgnoredActor(actor);

	bool bHit = GetWorld()->LineTraceSingleByChannel
	(
		hitResult,
		start,
		end,
		ECC_Visibility,
		traceParams
	);

	if (bHit)
	{
		// 라인 트레이스를 이용한 추가적인 내용
	}

	Destroy();
}
```

- 투사체 타격에 대한 처리 내용

- 왜 시그니처의 hit이 있는데도 불구하고 다시 FHitResult을 사용하였나?

  - 시그니처의 hit은 타격된 대상에 대한 정보를 담고 있으며 그 대상에 대해 상호작용을 처리할 때 사용
  - 새로 만든 FHitResult는 라인 트레이스를 이용해 추가적인 효과나 처리를 위해 따로 만듬

  

- 놓친 점

  - \[block\]이 되지 않은 상태의 대상으로는 바인딩 된 onhit이 호출되지 않기 때문에 따로 overlap에 대한 처리를 해줘야 함

  ##### Overlap에 대한 처리

  ``` cpp
  void ABaseProjectlie::NotifyActorBeginOverlap(AActor* OtherActor)
  {
  	Super::NotifyActorBeginOverlap(OtherActor);
  
  	UE_LOG(LogTemp, Log, TEXT("HIT Comp : %s"), *OtherActor->GetName());
  
  }
  ```

  ```cpp
  void ABaseProjectlie::NotifyActorEndOverlap(AActor* OtherActor)
  {
  	Super::NotifyActorEndOverlap(OtherActor);
  	UE_LOG(LogTemp, Log, TEXT("HIT Comp : %s"), *OtherActor->GetName());
  
  }
  ```

<{{ site.url }}{{ site.baseurl }}/second_pretice>
  