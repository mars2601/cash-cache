Vagrant.configure( "2" ) do | config |

    config.vm.box = "ubuntu/trusty64"

    config.vm.hostname = "chech-lajan.lan"

    config.vm.provision :shell, :path => "_dev/deploy.sh"

    # change the IP by one you own
    # config.vm.network :private_network, ip: "192.168.111.222"
    # config.vm.network :forwarded_port, guest: 27017, host: 27017

    config.vm.provider "virtualbox" do | vbox |
        vbox.name = "chech-lajan2"
    end
    config.hostmanager.enabled = true
    config.hostmanager.manage_host = true
    config.hostmanager.ignore_private_ip = false
    config.hostmanager.include_offline = true
    config.vm.define 'cc.local' do |node|
      node.vm.hostname = 'cc.local.dev'
      node.vm.network :private_network, ip: '192.168.111.222'
    end
end
