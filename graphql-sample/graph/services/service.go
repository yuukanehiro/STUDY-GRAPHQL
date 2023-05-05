package services

import (
	"context"

	"github.com/saki-engineering/graphql-sample/graph/model"

	"github.com/volatiletech/sqlboiler/v4/boil"
)

//go:generate mockgen -source=$GOFILE -package=$GOPACKAGE -destination=../../mock/$GOPACKAGE/service_mock.go
type Services interface {
	UserService
}

type services struct {
	*userService
	// issueテーブルを扱うissueServiceなど、他のサービス構造体ができたらフィールドを追加していく
}

type UserService interface {
	GetUserByName(ctx context.Context, name string) (*model.User, error)
}

func New(exec boil.ContextExecutor) Services {
	return &services{
		userService: &userService{exec: exec},
	}
}