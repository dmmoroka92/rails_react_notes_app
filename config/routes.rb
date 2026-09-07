Rails.application.routes.draw do
  resources :notes, only: %i[index create update destroy]
  resources :folders, only: %i[index create update destroy]
end
