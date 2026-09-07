Rails.application.routes.draw do
  resources :notes, only: %i[index create update destroy]
  resources :folders,
            param: :slug,
            only: %i[index show create update destroy]
end
