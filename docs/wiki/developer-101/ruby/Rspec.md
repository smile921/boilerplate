### Rspec(基本测试)


**安装**

	group :development, :test do
	  gem 'rspec-rails', '~> 3.5'
	end
	
	rails generate rspec:install
	
**重要操作**

文件: `spec/rails_helper.rb`

去掉注释(23行): `...spec/support/**/*.rb..`

**第一个测试**

生成模型

	rails g model book name author price 
	
	
spec/models/book_spec.rb

	require 'rails_helper'
	
	RSpec.describe Book, type: :model do
	  it "数据正确可以通过测试" do
	
	    book = Book.new(
	          name: 'xx',
	          author: 'yy',
	          price: 123
	    )
	
	    expect(book).to be_valid
	
	  end
	end
	
运行测试
	
	bundle exec rspec
	
	
### guard-rspec(测试自动)

**安装**

	group :development, :test do
	  gem 'guard-rspec', '~> 4.7'
	end
	
	bundle exec guard init rspec
	
	bundle exec guard
	
	
### shoulda-matchers（简化测试）



	
**安装**

	group :development, :test do
	  gem 'shoulda-matchers', '~> 3.1'
	end
	
**新增文件 spec/support/shoulda_matchers.rb**


	# https://github.com/thoughtbot/shoulda-matchers#getting-started
	RSpec.configure do |config|
	  Shoulda::Matchers.configure do |config|
	    config.integrate do |with|
	      # test framework
	      with.test_framework :rspec
	      # libraries
	      with.library :rails
	    end
	  end
	end
	
### 结果显示格式(.rspec)

选择一个模式即可

文档模式

	--format documentation

fuubar模式

	gem 'fuubar', '~> 2.2'
	
	--format Fuubar


