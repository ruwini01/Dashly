import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  Edit,
  Save,
  Camera,
  Building,
  Briefcase
} from "lucide-react";

export default function Profile() {

    
    return (
      <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Profile</h1>
          <p className="text-muted-foreground">Manage your account settings and preferences</p>
        </div>
        <Button 
          onClick={isEditing ? handleSave : () => setIsEditing(true)}
          className="bg-gradient-cta text-white shadow-elegant hover:shadow-glow transition-all"
        >
          {isEditing ? (
            <>
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </>
          ) : (
            <>
              <Edit className="w-4 h-4 mr-2" />
              Edit Profile
            </>
          )}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Picture & Basic Info */}
        <Card className="shadow-card">
          <CardContent className="p-6 space-y-6">
            <div className="text-center space-y-4">
              <div className="relative inline-block">
                <Avatar className="w-32 h-32 mx-auto border-4 border-primary/20">
                  <AvatarImage src={profile.avatar} />
                  <AvatarFallback className="text-2xl bg-gradient-primary text-white">
                    {profile.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                {isEditing && (
                  <Button 
                    size="icon" 
                    className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 bg-primary"
                  >
                    <Camera className="w-4 h-4" />
                  </Button>
                )}
              </div>
              
              {isEditing ? (
                <div className="space-y-3">
                  <Input
                    value={profile.name}
                    onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                    className="text-center text-xl font-bold"
                  />
                  <Input
                    value={profile.title}
                    onChange={(e) => setProfile(prev => ({ ...prev, title: e.target.value }))}
                    className="text-center text-muted-foreground"
                  />
                </div>
              ) : (
                <div>
                  <h2 className="text-xl font-bold">{profile.name}</h2>
                  <p className="text-muted-foreground">{profile.title}</p>
                </div>
              )}
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-muted-foreground" />
                {isEditing ? (
                  <Input
                    value={profile.email}
                    onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                    className="flex-1"
                  />
                ) : (
                  <span className="text-sm">{profile.email}</span>
                )}
              </div>
              
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-muted-foreground" />
                {isEditing ? (
                  <Input
                    value={profile.phone}
                    onChange={(e) => setProfile(prev => ({ ...prev, phone: e.target.value }))}
                    className="flex-1"
                  />
                ) : (
                  <span className="text-sm">{profile.phone}</span>
                )}
              </div>
              
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                {isEditing ? (
                  <Input
                    value={profile.location}
                    onChange={(e) => setProfile(prev => ({ ...prev, location: e.target.value }))}
                    className="flex-1"
                  />
                ) : (
                  <span className="text-sm">{profile.location}</span>
                )}
              </div>

              <div className="flex items-center gap-3">
                <Building className="w-4 h-4 text-muted-foreground" />
                {isEditing ? (
                  <Input
                    value={profile.company}
                    onChange={(e) => setProfile(prev => ({ ...prev, company: e.target.value }))}
                    className="flex-1"
                  />
                ) : (
                  <span className="text-sm">{profile.company}</span>
                )}
              </div>

              <div className="flex items-center gap-3">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">Joined {new Date(profile.joinDate).toLocaleDateString()}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Information */}
        <div className="lg:col-span-2 space-y-6">
          {/* Bio Section */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                About
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isEditing ? (
                <Textarea
                  value={profile.bio}
                  onChange={(e) => setProfile(prev => ({ ...prev, bio: e.target.value }))}
                  placeholder="Tell us about yourself..."
                  className="min-h-[100px]"
                />
              ) : (
                <p className="text-muted-foreground">{profile.bio}</p>
              )}
            </CardContent>
          </Card>

          {/* Work Information */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="w-5 h-5" />
                Work Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="department">Department</Label>
                  {isEditing ? (
                    <Select value={profile.department} onValueChange={(value) => setProfile(prev => ({ ...prev, department: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Product">Product</SelectItem>
                        <SelectItem value="Engineering">Engineering</SelectItem>
                        <SelectItem value="Design">Design</SelectItem>
                        <SelectItem value="Marketing">Marketing</SelectItem>
                        <SelectItem value="Sales">Sales</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <p className="text-sm font-medium">{profile.department}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="timezone">Timezone</Label>
                  {isEditing ? (
                    <Select value={profile.timezone} onValueChange={(value) => setProfile(prev => ({ ...prev, timezone: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Pacific Standard Time">Pacific Standard Time</SelectItem>
                        <SelectItem value="Mountain Standard Time">Mountain Standard Time</SelectItem>
                        <SelectItem value="Central Standard Time">Central Standard Time</SelectItem>
                        <SelectItem value="Eastern Standard Time">Eastern Standard Time</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <p className="text-sm font-medium">{profile.timezone}</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Skills Section */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Skills & Expertise</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {profile.skills.map((skill, index) => (
                  <Badge 
                    key={index} 
                    variant="secondary" 
                    className="bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                  >
                    {skill}
                    {isEditing && (
                      <button
                        onClick={() => handleSkillRemove(skill)}
                        className="ml-1 hover:text-destructive"
                      >
                        ×
                      </button>
                    )}
                  </Badge>
                ))}
                {isEditing && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-dashed border-primary/50 text-primary hover:bg-primary/10"
                  >
                    + Add Skill
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
    );
}

