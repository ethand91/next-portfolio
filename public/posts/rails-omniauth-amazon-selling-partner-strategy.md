---
title: "I created my own Rails Omniauth Amazon Selling Partner API Strategy"
metaTitle: "I created my own Rails Omniauth Amazon Selling Partner API Strategy"
metaDesc: "I created my own Rails Omniauth Amazon Selling Partner API Strategy"
socialImage: assets/images/rails.webp
date: "2022-09-11"
tags:
	- rails
---

Hello! 😀

Recently I had to support logging in via the amazon seller API for my job. I couldn't find an already implemented solution so I decided to have a go and support it myself.

In this article I will go through how I managed to support it and hopefully it will help anyone else that has the same dilemma.

Please note that the application uses the demise gem to support easy user registration/login etc.

---

## Creating the Strategy file
First we need to create a custom strategy file to support Amazon Selling Partner API login.

Strategy files are located in the project's "lib" directory, my custom strategy file contents is as follows: (lib/amazon_strategy.rb)

```ruby
require "omniauth"

module OmniAuth
  module Strategies
    class Amazon < OmniAuth::Strategies::OAuth2
      option :name, "amazon"

      option :client_options, {
        :site => "https://www.amazon.com",
        :authorize_url => "https://sellercentral-japan.amazon.com/apps/authorize/consent",
        :token_url => "https://api.amazon.com/auth/o2/token"
      }

      option :access_token_options, {
        :mode => :query
      }
	  option :authorize_params, {
        :application_id => Rails.application.credentials.amazon_sp_api.app_id,
        :scope => "profile:user_id",
        :version => :beta
      }

      def callback_url
        full_host + "/oauth/amazon_seller/callback"
      end
    end
  end
end
```

Please note that this implementation uses Japan's authorize_url. 
The strategy allows the user to login via the Amazon Seller API, the user's unique id is the user's "CustomerId".

The Amazon Seller App id is stored in the credentials file, and since the application is not ready for production yet, you have to pass the "version=beta" parameter, this will be stripped once the application is ready for production.

---

## Handling the OAuth callback
Next the oauth callback needs to be handled, I implemented this in my custom Amazon Controller but you can use the Omniauth Controller if you wish.

The source for the callback is as follows:

```ruby
class AmazonMwsController < ApplicationController
  def callback
    user = User.find_for_amazon_oauth(params[:selling_partner_id])
    flash[:success] = "success"
    sign_in(:user, user)

    fetch_token(user, params)

    redirect_to root_url
  end 

  private

  def fetch_token(user, params)
    conn = Faraday::Connection.new

    response = conn.post "https://api.amazon.com/auth/o2/token", {
      grant_type: :authorization_code,
      code: params[:spapi_oauth_code],
      redirect_uri: "https://#{request.host}/oauth/amazon_seller/callback",
      **Rails.application.credentials.amazon_sp_api
    }   

    body = JSON.parse(response.body)

    user.update(body.select{|k| %w[access_token refresh_token].include?(k)})
  end
end
```

The above creates/gets the user and then sends a request to get the current access token which is then saved into the Database, if all goes well the user is successfully logged in and redirected.

The User.find_for_amazon_oauth basically just returns the user if found or creates them if not found.

---

## Adding the custom strategy to devise
Finally we need to inform devise of the custom strategy, if you are not using devise you may need to create a "config/initializers/omniauth.rb" file. 

If you are using devise the contents will be liked the following:

```ruby
config.omniauth :amazon,
    ENV["AWS_CLIENT_ID"],
    ENV["AWS_CLIENT_SECRET"],
    name: :amazon,
    scope: %w(profile:user_id)
```

I'm currently using ENV but this will be replaced with credentials in the near future. 

The AWS_CLIENT_ID being the application's client id and the AWS_CLIENT_SECRET being the application's client secret.

All done this is how I implemented a custom strategy with Rails and Devise.

---

## Conclusion
Thanks for making it this far into my article.
Here I have shown how to implement a custom omniauth strategy into a Rails application.

Please note I am completely new to Rails and this is the first time I've had to implement something like this so if they is anything I've missed please tell me. 🥺

Also if there is a need for a AWS Selling Partner API strategy gem, I'm thinking of turning this into a gem. 😊

Overall it was a very good learning experience. 

Happy Coding!

Edit: I published my first Gem! The repo can be found here:
https://github.com/ethand91/omniauth-amazon-sp

---

Like me work? I post about a variety of topics, if you would like to see more please like and follow me.
Also I love coffee. 

[![“Buy Me A Coffee”](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.buymeacoffee.com/ethand9999)
