class ContactsController < ApplicationController
  def index
    @contacts = Contact.all
  end

  def show
    @contact = Contact.find(params[:id])
  end

  def new
    @contact = Contact.new
  end

  def create
    # TODO: validate
    @contact = Contact.new(contact_params)
    if @contact.save
      redirect_to @contact
    else
      # TODO: display an error message
      render "new"
    end
  end

  def destroy
    contact = Contact.find(params[:id])
    contact.destroy
    redirect_to contacts_path
  end

  private
    def contact_params
      params.require(:contact).permit(:email)
    end
end
