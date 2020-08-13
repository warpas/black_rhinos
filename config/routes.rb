Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root "pages#main"
  resources :contacts
  get '/three_js_example', to: 'pages#three_example'
end
