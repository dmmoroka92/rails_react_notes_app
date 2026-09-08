Rails.application.routes.draw do
  resources :notes, only: %i[index create update destroy] do
    post :archive, on: :collection
    delete :destroy, on: :collection
  end
  resources :folders,
            param: :slug,
            only: %i[index show create update destroy]
end
